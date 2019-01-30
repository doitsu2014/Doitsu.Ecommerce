using Doitsu.Service;
using Doitsu.Service.Core;
using System;
using System.Collections.Generic;
using System.Text;
using Doitsu.Fandom.DbManager.Models;

namespace Doitsu.Fandom.DBManager.ViewModels
{
    public class BlogViewModel : BaseViewModel<Blogs>
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Slug { get; set; }
        public bool IsSlider { get; set; }

        public int? BlogType { get; set; }
        public string ThumbnailURL { get; set; }
        public bool Active { get; set; }

        public DateTime DraftTime { get; set; }
        public DateTime? PublishTime { get; set; }
        public DateTime? UpdateTime { get; set; }

        public bool IsPublished { get; set; }
        public string PublisherEmail { get; set; }

        public int? BlogCategoryID { get; set; }
        public string PublisherId { get; set; }
    }
}
