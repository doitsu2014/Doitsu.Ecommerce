using AutoMapper;
using Doitsu.Fandom.DBManager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper.QueryableExtensions;
using Doitsu.Service.Core;
using Doitsu.Fandom.DbManager.Models;

namespace Doitsu.DBManager.Fandom.Services
{
    public interface IProductService : IBaseService<Products, ProductViewModel>
    {
        IQueryable<ProductViewModel> GetActiveByQuery(int limit, int pageSize, int currentPage, string name, int? collectionId, int? id);
        /// <summary>
        /// Count all product may be support to pagination
        /// </summary>
        /// <param name="collectionId"></param>
        /// <returns></returns>
        int CountProducts(int? collectionId);
        ProductViewModel FindBySlug(string slug);
    }
    public class ProductService : BaseService<Products, ProductViewModel>, IProductService
    {
        public ProductService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        public int CountProducts(int? collectionId)
        {
            var result = GetActiveAsNoTracking(p => collectionId == null || collectionId == p.CollectionId).Count();
            return result;
        }

        public ProductViewModel FindBySlug(string slug)
        {
            var productE = GetActiveAsNoTracking(p => p.Slug.Equals(slug, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
            var productVM = EToVM(productE);
            return productVM;
         }

        public IQueryable<ProductViewModel> GetActiveByQuery(int limit, int pageSize, int currentPage, string name, int? collectionId, int? id)
        {
            IQueryable<Products> listQuery = GetActiveAsNoTracking(a =>
                a.Active == true
                && (id == null || a.Id == id.Value)
                && (name.IsNullOrEmpty() || a.Name.Contains(name, StringComparison.CurrentCultureIgnoreCase))
                && (collectionId == null || a.CollectionId == collectionId)
            );

            listQuery = listQuery.OrderBy(a => a.Id);
            if (limit > 0)
            {
                listQuery = listQuery.Take(limit);
            }

            if (pageSize > 0 && currentPage > 0)
            {
                listQuery.Skip(pageSize * currentPage).Take(pageSize);
            }

            var list = listQuery.ProjectTo<ProductViewModel>(this.Mapper.ConfigurationProvider);
            if (list.Count() > 0)
                return list;
            else
                return null;
        }
    }
}
