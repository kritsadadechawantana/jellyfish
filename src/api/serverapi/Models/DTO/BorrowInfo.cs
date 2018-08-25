using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverapi.Models.DTO
{
    public class BorrowInfo
    {
        public string Id { get; set; }
        public string ItemId { get; set; }
        public string Name { get; set; }
        public string Slot { get; set; }
        public string Owner { get; set; }
        public string Approver { get; set; }
    }
}
