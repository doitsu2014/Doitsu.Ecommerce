using System;
using System.Collections.Generic;

namespace Doitsu.Fandom.DbManager.Models
{
    public partial class Categories
    {
        public Categories()
        {
            ProductCollections = new HashSet<ProductCollections>();
            Products = new HashSet<Products>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<ProductCollections> ProductCollections { get; set; }
        public virtual ICollection<Products> Products { get; set; }
    }
}
