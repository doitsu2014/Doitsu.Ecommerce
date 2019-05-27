using AutoMapper;
using AutoMapper.QueryableExtensions;
using Doitsu.Fandom.DbManager.Models;
using Doitsu.Fandom.DBManager.ViewModels;
using Doitsu.Service.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using Doitsu.Fandom.DbManager.ViewModels;
using System.Threading.Tasks;
using Serilog;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Doitsu.DBManager.Fandom.Services
{
    public interface IBlogService : IBaseService<Blogs, BlogViewModel>
    {
        /// <summary>
        /// Gets the active by query.
        /// </summary>
        /// <returns>The active by query.</returns>
        /// <param name="limit">Limit.</param>
        /// <param name="currentPage">Current page.</param>
        /// <param name="name">Name.</param>
        /// <param name="blogCategoryId">Blog category identifier.</param>
        /// <param name="id">Identifier.</param>
        /// <param name="isSlider">Is slider.</param>
        IQueryable<BlogViewModel> GetActiveByQuery(int limit, int currentPage, string name = "", int? blogCategoryId = null, int? id = null, bool? isSlider = null);

        /// <summary>
        /// Gets the active short term by query.
        /// </summary>
        /// <returns>The active short term by query.</returns>
        /// <param name="limit">Limit.</param>
        /// <param name="currentPage">Current page.</param>
        /// <param name="name">Name.</param>
        /// <param name="blogCategoryId">Blog category identifier.</param>
        /// <param name="id">Identifier.</param>
        /// <param name="isSlider">Is slider.</param>
        IQueryable<BlogShortTermViewModel> GetActiveShortTermByQuery(int limit, int currentPage, string name = "", int? blogCategoryId = null, int? id = null, bool? isSlider = null);

        /// <summary>
        /// Creates the blog with constraint.
        /// </summary>
        /// <returns>The blog with constraint.</returns>
        /// <param name="blogVM">Blog vm.</param>
        Task<BlogViewModel> CreateBlogWithConstraintAsync(BlogViewModel blogVM);

        /// <summary>
        /// Updates the blog with constraint async.
        /// </summary>
        /// <returns>The blog with constraint async.</returns>
        /// <param name="blogVM">Blog vm.</param>
        Task<BlogViewModel> UpdateBlogWithConstraintAsync(BlogViewModel blogVM);

        /// <summary>
        /// Count all product may be support to pagination
        /// </summary>
        /// <param name="blogCategoryId"></param>
        /// <returns></returns>
        int CountBlogs(int? blogCategoryId);

        /// <summary>
        /// Finds the by slug async
        /// </summary>
        /// <returns>The blog VM.</returns>
        /// <param name="slug">Slug.</param>
        Task<BlogViewModel> FindBySlugAsync(string slug);

        /// <summary>
        /// Count all product may be support to pagination
        /// </summary>
        /// <param name="blogCategoryId"></param>
        /// <returns></returns>
        Task<int> CountBlogsByBlogCategoryIdAsync(int? blogCategoryId);

    }
    public class BlogService : BaseService<Blogs, BlogViewModel>, IBlogService
    {
        private readonly ITagService tagService;
        private readonly IBlogTagService blogTagService;

        public BlogService(IUnitOfWork unitOfWork, IMapper mapper, ITagService tagService, IBlogTagService blogTagService) : base(unitOfWork, mapper)
        {
            this.tagService = tagService;
            this.blogTagService = blogTagService;
        }

        public int CountBlogs(int? blogCategoryId)
        {
            var result = GetActiveAsNoTracking(
                p => blogCategoryId == null
                || blogCategoryId == p.BlogCategoryId)
                .Count();
            return result;
        }

        public async Task<BlogViewModel> FindBySlugAsync(string slug)
        {
            var productVM = await GetActiveAsNoTracking(p => p.Slug.Equals(slug, StringComparison.InvariantCultureIgnoreCase)).ProjectTo<BlogViewModel>(this.Mapper.ConfigurationProvider).FirstOrDefaultAsync();
            return productVM;
        }

        public IQueryable<BlogShortTermViewModel> GetActiveShortTermByQuery(int limit, int currentPage, string name = "", int? blogCategoryId = null, int? id = null, bool? isSlider = null)
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
                listQuery = listQuery.Skip(limit * (currentPage - 1)).Take(limit);
            }
            else if (limit > 0)
            {
                listQuery = listQuery.Take(limit);
            }

            var list = listQuery.ProjectTo<BlogShortTermViewModel>(this.Mapper.ConfigurationProvider);
            return list;
        }

        public IQueryable<BlogViewModel> GetActiveByQuery(int limit, int currentPage, string name = "", int? blogCategoryId = null, int? id = null, bool? isSlider = null)
        {
            IQueryable<Blogs> listQuery = GetActiveAsNoTracking(a =>
                (id == null || a.Id == id.Value)
                && (isSlider == null || isSlider == a.IsSlider)
                && (name.IsNullOrEmpty() || a.Title.Contains(name, StringComparison.CurrentCultureIgnoreCase))
                && (blogCategoryId == null || a.BlogCategoryId == blogCategoryId)
            );

            listQuery = listQuery
                .OrderByDescending(a => a.PublishTime)
                .OrderByDescending(a => a.DraftTime);


            if (limit > 0 && currentPage > 0)
            {
                listQuery = listQuery.Skip(limit * (currentPage - 1)).Take(limit);
            }
            else if (limit > 0)
            {
                listQuery = listQuery.Take(limit);
            }

            var list = listQuery.ProjectTo<BlogViewModel>(this.Mapper.ConfigurationProvider);
            return list;
        }

        public async Task<BlogViewModel> CreateBlogWithConstraintAsync(BlogViewModel blogVM)
        {
            // begin transaction
            using (var transaction = this.UnitOfWork.CreateTransac())
            {
                try
                {
                    // after binding tag from db
                    // Create blog and binding blog tag
                    var createBlogResult = await CreateAsync(blogVM);

                    // finding tag title and make sure create new tag if it does exist
                    List<TagViewModel> listTagVM = new List<TagViewModel>();
                    foreach (var title in blogVM.Tags)
                    {
                        var blogTagVM = new BlogTagViewModel()
                        {
                            BlogId = createBlogResult.Id,
                            Active = true
                        };
                        var existTag = await tagService.FirstOrDefaultActiveAsync(x => x.Title.Equals(title, StringComparison.OrdinalIgnoreCase));
                        if (existTag == null)
                        {
                            // if title does not exist, create new tag with this title and add to list
                            var result = await tagService.CreateAsync(new TagViewModel() { Title = title, Active = true });
                            blogTagVM.TagId = result.Id;
                            await blogTagService.CreateAsync(blogTagVM);
                        }
                        else
                        {
                            // if title does exist tag add to list tag VM
                            blogTagVM.TagId = existTag.Id;
                            await blogTagService.CreateAsync(blogTagVM);
                        }
                    }
                    transaction.Commit();
                    return createBlogResult;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
        }

        public async Task<BlogViewModel> UpdateBlogWithConstraintAsync(BlogViewModel blogVM)
        {
            // begin transaction
            using (var transaction = this.UnitOfWork.CreateTransac())
            {
                try
                {
                    // after binding tag from db
                    // Update blog and binding blog tag
                    var updateBlogResult = await UpdateAsync(blogVM.Id, blogVM);

                    // Remove all list blog tag
                    var listCurrentBlogTagVM = await blogTagService.GetActive(x => x.BlogId == blogVM.Id).ToListAsync();
                    foreach (var currentBTVM in listCurrentBlogTagVM)
                    {
                        await blogTagService.DeleteByObjAsync(currentBTVM);
                    }
                    // finding tag title and make sure create new tag if it does exist
                    List<TagViewModel> listTagVM = new List<TagViewModel>();
                    foreach (var title in blogVM.Tags)
                    {
                        var blogTagVM = new BlogTagViewModel()
                        {
                            BlogId = updateBlogResult.Id,
                            Active = true
                        };
                        var existTag = await tagService.FirstOrDefaultActiveAsync(x => x.Title.Equals(title, StringComparison.OrdinalIgnoreCase));
                        if (existTag == null)
                        {
                            // if title does not exist, create new tag with this title and add to list
                            var result = await tagService.CreateAsync(new TagViewModel() { Title = title, Active = true });
                            blogTagVM.TagId = result.Id;
                            await blogTagService.CreateAsync(blogTagVM);
                        }
                        else
                        {
                            // if title does exist tag add to list tag VM
                            blogTagVM.TagId = existTag.Id;
                            await blogTagService.CreateAsync(blogTagVM);
                        }
                    }
                    transaction.Commit();
                    return updateBlogResult;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
        }

        public async Task<int> CountBlogsByBlogCategoryIdAsync(int? blogCategoryId)
        {
            var result = await GetActiveAsNoTracking(
              p => blogCategoryId == null
              || blogCategoryId == p.BlogCategoryId)
              .CountAsync();
            return result;
        }
    }
}
