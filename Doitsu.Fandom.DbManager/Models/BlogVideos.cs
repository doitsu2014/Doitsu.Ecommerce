using System;
using System.Collections.Generic;

namespace Doitsu.Fandom.DbManager.Models
{
    public partial class BlogVideos
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public DateTime UploadTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public int BlogId { get; set; }
        public bool Active { get; set; }

        public virtual Blogs Blog { get; set; }
    }
}
