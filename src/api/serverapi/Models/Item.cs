using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverapi.Models
{
    public class Item
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Slot { get; set; }
        public bool IsBorrow { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
