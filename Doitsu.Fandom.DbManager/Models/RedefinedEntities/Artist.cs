using System;
using Doitsu.Service.Core;

namespace Doitsu.Fandom.DbManager.Models.RedefinedEntities
{
    public partial class Artist : IActivable
    {
        public virtual bool Active { get; set; }
    }
}
