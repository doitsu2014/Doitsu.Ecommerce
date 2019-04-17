using AutoMapper;
using AutoMapper.QueryableExtensions;
using Doitsu.Fandom.DbManager.Models;
using Doitsu.Fandom.DBManager.ViewModels;
using Doitsu.Service.Core;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Doitsu.DBManager.Fandom.Services
{
    public interface IBlogService : IBaseService<Blogs, BlogViewModel>
    {
        IQueryable<BlogViewModel> GetActiveByQuery(int limit, int currentPage, string name = "", int? blogCategoryId = null, int? id = null, bool? isSlider = null);
        /// <summary>
        /// Count all product may be support to pagination
        /// </summary>
        /// <param name="blogCategoryId"></param>
        /// <returns></returns>
        int CountBlogs(int? blogCategoryId);
        BlogViewModel FindBySlug(string slug);
    }
    public class BlogService : BaseService<Blogs, BlogViewModel>, IBlogService
    {
        public BlogService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        public int CountBlogs(int? blogCategoryId)
        {
            var result = GetActiveAsNoTracking(p => blogCategoryId == null || blogCategoryId == p.BlogCategoryId).Count();
            return result;
        }

        public BlogViewModel FindBySlug(string slug)
        {
            var productE = GetActiveAsNoTracking(p => p.Slug.Equals(slug, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
            var productVM = EToVM(productE);
            return productVM;
        }

        public IQueryable<BlogViewModel> GetActiveByQuery(int limit, int currentPage, string name = "", int? blogCategoryId = null, int? id = null, bool? isSlider = null)
        {
            IQueryable<Blogs> listQuery = GetActiveAsNoTracking(a =>
                a.Active
                && (id == null || a.Id == id.Value)
                && (isSlider == null || isSlider == a.IsSlider)
                && (name.IsNullOrEmpty() || a.Title.Contains(name, StringComparison.CurrentCultureIgnoreCase))
                && (blogCategoryId == null || a.BlogCategoryId == blogCategoryId)
            );

            listQuery = listQuery
                .OrderByDescending(a => a.PublishTime)
                .OrderByDescending(a => a.DraftTime);


            if (limit > 0 && currentPage > 0)
            {
                listQuery.Skip(limit * currentPage).Take(limit);
            }
            else if (limit > 0)
            {
                listQuery = listQuery.Take(limit);
            }

            var list = listQuery.ProjectTo<BlogViewModel>(this.Mapper.ConfigurationProvider);
            return list;
        }

    }
}
