using serverapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace serverapi.Dac.Contract
{
    public interface ISlotDac
    {
        Slot Get(Expression<Func<Slot, bool>> expression);
        IEnumerable<Slot> List(Expression<Func<Slot, bool>> expression);
        void Create(Slot document);
        void Update(Slot document);
    }
}
