using AutoMapper;
using Doitsu.Fandom.DbManager.Models;
using Doitsu.Service;
using Doitsu.Service.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Doitsu.Fandom.DBManager.ViewModels
{
    public class ProductCollectionViewModel : BaseViewModel<ProductCollections>
    {
        public ProductCollectionViewModel()
        {
        }
        public ProductCollectionViewModel(ProductCollections entity, IMapper mapper) : base(entity, mapper)
        {
        }
        public int ID { get; set; }
        public string Name { get; set; }
        public string ThumbnailURL { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
        public bool IsSlider { get; set; }

        public bool Active { get; set; }
        // Classification
        public DateTime CreatedTime { get; set; }
        public DateTime UpdatedTime { get; set; }
        public int? ArtistID { get; set; }


        public List<ProductViewModel> ListProducts { get; set; }
    }
}
