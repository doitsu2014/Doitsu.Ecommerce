using System;
using System.Collections.Generic;

namespace Doitsu.Fandom.DbManager.Models
{
    public partial class Tag
    {
        public Tag()
        {
            BlogTag = new HashSet<BlogTag>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<BlogTag> BlogTag { get; set; }
    }
}
