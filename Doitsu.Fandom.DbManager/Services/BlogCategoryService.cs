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
    public interface IBlogCategoryService : IBaseService<BlogCategories, BlogCategoryViewModel>
    {
    }
    public class BlogCategoryService : BaseService<BlogCategories, BlogCategoryViewModel>, IBlogCategoryService
    {
        public BlogCategoryService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

    }
}
