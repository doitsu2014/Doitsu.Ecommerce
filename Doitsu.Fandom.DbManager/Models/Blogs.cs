using System;
using System.Collections.Generic;

namespace Doitsu.Fandom.DbManager.Models
{
    public partial class Blogs
    {
        public Blogs()
        {
            BlogVideos = new HashSet<BlogVideos>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime DraftTime { get; set; }
        public DateTime? PublishTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public bool? IsPublished { get; set; }
        public string PublisherEmail { get; set; }
        public string PublisherId { get; set; }
        public int? BlogCategoryId { get; set; }
        public int? BlogType { get; set; }
        public int? ArtistId { get; set; }
        public bool Active { get; set; }
        public string Slug { get; set; }
        public string ThumbnailUrl { get; set; }
        public bool IsSlider { get; set; }

        public virtual Artist Artist { get; set; }
        public virtual BlogCategories BlogCategory { get; set; }
        public virtual ICollection<BlogVideos> BlogVideos { get; set; }
    }
}
