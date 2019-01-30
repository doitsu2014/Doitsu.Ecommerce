using System;
using System.Collections.Generic;

namespace Doitsu.Fandom.DbManager.Models
{
    public partial class ProductCollections
    {
        public ProductCollections()
        {
            Products = new HashSet<Products>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Description { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime UpdatedTime { get; set; }
        public int? ArtistId { get; set; }
        public int? CategoryId { get; set; }
        public bool Active { get; set; }
        public string Slug { get; set; }
        public int Type { get; set; }
        public bool IsSlider { get; set; }

        public virtual Artist Artist { get; set; }
        public virtual Categories Category { get; set; }
        public virtual ICollection<Products> Products { get; set; }
    }
}
