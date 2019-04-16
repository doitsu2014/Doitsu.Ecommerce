using System;
using Doitsu.Service.Core;
using Doitsu.Service.Core.ModelBase;

namespace Doitsu.Fandom.DbManager.Models.RedefinedEntities
{
    public partial class Blogs : IActivable
    {
        public virtual bool Active { get; set; }
    }
}
