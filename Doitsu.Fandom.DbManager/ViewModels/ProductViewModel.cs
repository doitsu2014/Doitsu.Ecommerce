using AutoMapper;
using System;
using Doitsu.Service.Core;
using Doitsu.Fandom.DbManager.Models;

namespace Doitsu.Fandom.DBManager.ViewModels
{
    public class ProductViewModel : BaseViewModel<Products>
    {

        public ProductViewModel()
        {

        }

        public ProductViewModel(Products entity, IMapper mapper) : base(entity, mapper)
        {
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string ThumbnailURL { get; set; }
        public string ResourceURL { get; set; }
        public string Description { get; set; }
        public string Slug { get; set; }
        public bool Active { get; set; }
        public bool IsAuthorized { get; set; }

        // External Defination
        public string Lyrics { get; set; }
        public string Composed { get; set; }
        public string Arrange { get; set; }

        public DateTime CreatedTime { get; set; }
        public DateTime UpdatedTime { get; set; }

        public int? ArtistId { get; set; }
        public int? CollectionId { get; set; }
    }
}
