using AutoMapper;
using AutoMapper.QueryableExtensions;
using Doitsu.Fandom.DbManager.Models;
using Doitsu.Fandom.DBManager.ViewModels;
using Doitsu.Service.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Doitsu.DBManager.Fandom.Services
{
    public interface IProductCollectionService : IBaseService<ProductCollections, ProductCollectionViewModel>
    {
        IQueryable<ProductCollectionViewModel> GetActiveByQuery(int limit, int currentPage, string name = "", int? id = null, bool? isSlider = null);
        ProductCollectionViewModel GetBySlug(string slug);
        IQueryable<ProductCollectionViewModel> GetActiveByQueryArtistCode(int limit, int currentPage, string artistCode = "");
        Task<int> CountWithIsSliderAsync(bool? isSlider = null);
    }
    public class ProductCollectionService : BaseService<ProductCollections, ProductCollectionViewModel>, IProductCollectionService
    {
        public ProductCollectionService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        public async Task<int> CountWithIsSliderAsync(bool? isSlider = null)
        {
            IQueryable<ProductCollections> listQuery = GetAsNoTracking(a =>
                  a.Active
                  && (isSlider == null || isSlider == a.IsSlider));

            var result = await listQuery.CountAsync();
            return result;
        }

        public IQueryable<ProductCollectionViewModel> GetActiveByQuery(int limit, int currentPage, string name = "", int? id = null, bool? isSlider = null)
        {
            IQueryable<ProductCollections> listQuery = GetAsNoTracking(a =>
            a.Active
            && (id == null || a.Id == id.Value)
            && (isSlider == null || isSlider == a.IsSlider)
            && (name.IsNullOrEmpty() || a.Name.Contains(name, StringComparison.CurrentCultureIgnoreCase)));

            listQuery = listQuery
                .OrderByDescending(a => a.CreatedTime);

            if (limit > 0 && currentPage > 0)
            {
                listQuery.Skip(limit * currentPage).Take(limit);
            }
            else if (limit > 0)
            {
                listQuery = listQuery.Take(limit);
            }


            var list = listQuery.ProjectTo<ProductCollectionViewModel>(this.Mapper.ConfigurationProvider);
            return list;
        }

        public IQueryable<ProductCollectionViewModel> GetActiveByQueryArtistCode(int limit, int currentPage, string artistCode = "")
        {
            IQueryable<ProductCollections> listQuery = GetAsNoTracking(a =>
                a.Active
                && (a.Artist.Code.Equals(artistCode, StringComparison.CurrentCultureIgnoreCase)));

            listQuery = listQuery
                .OrderByDescending(a => a.CreatedTime);


            if (limit > 0 && currentPage > 0)
            {
                listQuery.Skip(limit * currentPage).Take(limit);
            }
            else if (limit > 0)
            {
                listQuery = listQuery.Take(limit);
            }

            var list = listQuery.ProjectTo<ProductCollectionViewModel>(this.Mapper.ConfigurationProvider);
            return list;
        }

        public ProductCollectionViewModel GetBySlug(string slug)
        {
            ProductCollectionViewModel result = FirstOrDefaultActive(p => p.Slug.Equals(slug, StringComparison.CurrentCultureIgnoreCase));
            return result;
        }
    }
}
