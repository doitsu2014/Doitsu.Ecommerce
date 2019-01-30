using System;
using System.Collections.Generic;

namespace Doitsu.Fandom.DbManager.Models
{
    public partial class Orders
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public double FinalAmount { get; set; }
        public double TotalAmount { get; set; }
        public double Discount { get; set; }
    }
}
