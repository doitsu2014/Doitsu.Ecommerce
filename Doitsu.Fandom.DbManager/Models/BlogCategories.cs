using System;
using System.Collections.Generic;

namespace Doitsu.Fandom.DbManager.Models
{
    public partial class BlogCategories
    {
        public BlogCategories()
        {
            Blogs = new HashSet<Blogs>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? Position { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<Blogs> Blogs { get; set; }
    }
}
