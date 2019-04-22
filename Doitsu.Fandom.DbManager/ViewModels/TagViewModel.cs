using Doitsu.Fandom.DbManager.Models;
using Doitsu.Service.Core;

namespace Doitsu.Fandom.DbManager.ViewModels
{
    public class TagViewModel : BaseViewModel<Tag>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Active { get; set; }
    }
}
