using System;
using Doitsu.Service.Core;
using Doitsu.Service.Core.ModelBase;

namespace Doitsu.Fandom.DbManager.Models.RedefinedEntities
{
    public partial class BlogCategories : IActivable
    {
        public virtual bool Active { get; set; }
    }
}
