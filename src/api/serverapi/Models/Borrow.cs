using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverapi.Models
{
    public class Borrow
    {
        public string Id { get; set; }
        public string ItemId { get; set; }
        public string Owner { get; set; }
        public string Approver { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
