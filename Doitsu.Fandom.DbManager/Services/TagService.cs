using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Doitsu.Fandom.DbManager.Models;
using Doitsu.Fandom.DbManager.ViewModels;
using Doitsu.Service.Core;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using AutoMapper.QueryableExtensions;

namespace Doitsu.DBManager.Fandom.Services
{
    public interface ITagService : IBaseService<Tag, TagViewModel>
    {
        /// <summary>
        /// Gets the popular async.
        /// </summary>
        /// <returns>The popular async.</returns>
        Task<List<TagViewModel>> GetPopularAsync();
        /// <summary>
        /// Counts the tag async.
        /// </summary>
        /// <returns>The tag async.</returns>
        Task<int> CountTagAsync();
    }

    public class TagService : BaseService<Tag, TagViewModel>, ITagService
    {
        public TagService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        public async Task<int> CountTagAsync()
        {
            var count = await this.SelfDbSet.AsNoTracking().CountAsync();
            return count;
        }

        public async Task<List<TagViewModel>> GetPopularAsync()
        {
            var queryAllTag = this.SelfDbSet.AsNoTracking();
            var noTag = await queryAllTag.CountAsync();
            if (noTag > 0)
            {
                var orderTagByCountBlog = queryAllTag.OrderByDescending(x => x.BlogTag.Count);
                // take 10 popular tags
                var result = await queryAllTag.ProjectTo<TagViewModel>(this.Mapper.ConfigurationProvider).Take(10).ToListAsync();
                return result;
            }
            else
            {
                return null;
            }
        }
    }
}
