using AutoMapper;
using AutoMapper.QueryableExtensions;
using Doitsu.Fandom.DbManager.Models;
using Doitsu.Fandom.DBManager;
using Doitsu.Fandom.DBManager.ViewModels;
using Doitsu.Service.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Doitsu.DBManager.Fandom.Services
{
    public interface IArtistService : IBaseService<Artist, ArtistViewModel>
    {
        IQueryable<ArtistViewModel> GetActiveByQuery(int limit, int pageSize, int currentPage, string name, string code, int? id);
    }

    public class ArtistService : BaseService<Artist, ArtistViewModel>, IArtistService
    {
        public ArtistService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        public IQueryable<ArtistViewModel> GetActiveByQuery(int limit, int pageSize, int currentPage, string name, string code, int? id)
        {
            IQueryable<Artist> listQuery = GetActiveAsNoTracking(a =>
            a.Active == true
            && (id == null || a.Id == id.Value)
            && (code.IsNullOrEmpty() || a.Code.Contains(code, StringComparison.CurrentCultureIgnoreCase))
            && (name.IsNullOrEmpty() || a.Name.Contains(name, StringComparison.CurrentCultureIgnoreCase)));

            listQuery = listQuery.OrderBy(a => a.Id);
            if(limit > 0)
            {
                listQuery = listQuery.Take(limit);
            }

            if(pageSize > 0 && currentPage > 0)
            {
                listQuery.Skip(pageSize * currentPage).Take(pageSize);
            }

            var list = listQuery.ProjectTo<ArtistViewModel>(this.Mapper.ConfigurationProvider);
            return list;
        }
    }
}
