using AutoMapper;
using AutoMapper.QueryableExtensions;
using Doitsu.Fandom.DbManager.Models;
using Doitsu.Fandom.DBManager.ViewModels;
using Doitsu.Service.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Doitsu.DBManager.Fandom.Services
{
    public interface IProductCollectionService : IBaseService<ProductCollections, ProductCollectionViewModel>
    {
        IQueryable<ProductCollectionViewModel> GetActiveByQuery(int limit, int pageSize, int currentPage, string name = "", int? id = null, bool? isSlider = null);
        ProductCollectionViewModel GetBySlug(string slug);
        IQueryable<ProductCollectionViewModel> GetActiveByQueryArtistCode(int limit, int pageSize, int currentPage, string artistCode = "");
    }
    public class ProductCollectionService : BaseService<ProductCollections, ProductCollectionViewModel>, IProductCollectionService
    {
        private IArtistService artistService;
        public ProductCollectionService(IUnitOfWork unitOfWork, IMapper mapper, IArtistService artistService) : base(unitOfWork, mapper)
        {
            this.artistService = artistService;
        }
        public IQueryable<ProductCollectionViewModel> GetActiveByQuery(int limit, int pageSize, int currentPage, string name = "", int? id = null, bool? isSlider = null)
        {
            IQueryable<ProductCollections> listQuery = GetAsNoTracking(a =>
            a.Active == true
            && (id == null || a.Id == id.Value)
            && (isSlider == null || isSlider == a.IsSlider)
            && (name.IsNullOrEmpty() || a.Name.Contains(name, StringComparison.CurrentCultureIgnoreCase)));

            listQuery = listQuery
                .OrderByDescending(a => a.CreatedTime);
            if (limit > 0)
            {
                listQuery = listQuery.Take(limit);
            }

            if (pageSize > 0 && currentPage > 0)
            {
                listQuery.Skip(pageSize * currentPage).Take(pageSize);
            }

            var list = listQuery.ProjectTo<ProductCollectionViewModel>(this.Mapper.ConfigurationProvider);
            return list;
        }

        public IQueryable<ProductCollectionViewModel> GetActiveByQueryArtistCode(int limit, int pageSize, int currentPage, string artistCode)
        {
            IQueryable<ProductCollections> listQuery = GetAsNoTracking(a =>
                a.Active == true
                && (a.Artist.Code.Equals(artistCode, StringComparison.CurrentCultureIgnoreCase)));

            listQuery = listQuery
                .OrderByDescending(a => a.CreatedTime);
            if (limit > 0)
            {
                listQuery = listQuery.Take(limit);
            }

            if (pageSize > 0 && currentPage > 0)
            {
                listQuery.Skip(pageSize * currentPage).Take(pageSize);
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
