using Doitsu.Fandom.DbManager.Models;
using Doitsu.Service.Core;

namespace Doitsu.Fandom.DbManager.ViewModels
{
    public class BlogTagViewModel : BaseViewModel<BlogTag>
    {
        public int Id { get; set; }
        public int BlogId { get; set; }
        public int TagId { get; set; }
        public bool Active { get; set; }
    }
}
