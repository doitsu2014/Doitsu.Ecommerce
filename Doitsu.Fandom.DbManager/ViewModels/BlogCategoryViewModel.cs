using Doitsu.Service;
using Doitsu.Service.Core;
using System;
using System.Collections.Generic;
using System.Text;
using Doitsu.Fandom.DbManager.Models;

namespace Doitsu.Fandom.DBManager.ViewModels
{
    public class BlogCategoryViewModel : BaseViewModel<BlogCategories>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Position { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public bool Active { get; set; }
    }
}
