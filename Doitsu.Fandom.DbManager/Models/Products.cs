using System;
using System.Collections.Generic;

namespace Doitsu.Fandom.DbManager.Models
{
    public partial class Products
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime UpdatedTime { get; set; }
        public string Description { get; set; }
        public int? CateId { get; set; }
        public string Arrange { get; set; }
        public int? ArtistId { get; set; }
        public string Composed { get; set; }
        public string Lyrics { get; set; }
        public int? CollectionId { get; set; }
        public string ResourceUrl { get; set; }
        public string ThumbnailUrl { get; set; }
        public bool Active { get; set; }
        public string Slug { get; set; }
        public bool IsAuthorized { get; set; }

        public virtual Artist Artist { get; set; }
        public virtual Categories Cate { get; set; }
        public virtual ProductCollections Collection { get; set; }
    }
}
