using System;
using System.Collections.Generic;

namespace Doitsu.Fandom.DbManager.Models
{
    public partial class Artist
    {
        public Artist()
        {
            Blogs = new HashSet<Blogs>();
            ProductCollections = new HashSet<ProductCollections>();
            Products = new HashSet<Products>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string AvatarUrl { get; set; }
        public bool Active { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Blogs> Blogs { get; set; }
        public virtual ICollection<ProductCollections> ProductCollections { get; set; }
        public virtual ICollection<Products> Products { get; set; }
    }
}
