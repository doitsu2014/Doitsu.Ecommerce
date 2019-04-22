using AutoMapper;
using Doitsu.Fandom.DbManager.Models;
using Doitsu.Fandom.DbManager.ViewModels;
using Doitsu.Service.Core;

namespace Doitsu.DBManager.Fandom.Services
{
    public interface IBlogTagService : IBaseService<BlogTag, BlogTagViewModel>
    {
    }

    public class BlogTagService : BaseService<BlogTag, BlogTagViewModel>, IBlogTagService
    {
        public BlogTagService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }
    }
}
