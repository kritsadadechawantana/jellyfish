using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverapi.Models
{
    public class Slot
    {
        public string Id { get; set; }
        public int Order { get; set; }
        public string Name { get; set; }
        public bool IsContain { get; set; }
    }
}
