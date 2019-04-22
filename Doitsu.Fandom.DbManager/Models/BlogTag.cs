using System;
using System.Collections.Generic;

namespace Doitsu.Fandom.DbManager.Models
{
    public partial class BlogTag
    {
        public int Id { get; set; }
        public int BlogId { get; set; }
        public int TagId { get; set; }
        public bool Active { get; set; }

        public virtual Blogs Blog { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
