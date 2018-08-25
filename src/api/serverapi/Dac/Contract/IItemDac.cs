using serverapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace serverapi.Dac.Contract
{
    public interface IItemDac
    {
        Item Get(Expression<Func<Item, bool>> expression);
        IEnumerable<Item> List(Expression<Func<Item, bool>> expression);
        void Create(Item document);
        void Update(Item document);
    }
}
