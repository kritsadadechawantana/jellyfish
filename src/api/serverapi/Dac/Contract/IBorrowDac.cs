using serverapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace serverapi.Dac.Contract
{
    public interface IBorrowDac
    {
        Borrow Get(Expression<Func<Borrow, bool>> expression);
        IEnumerable<Borrow> List(Expression<Func<Borrow, bool>> expression);
        void Create(Borrow document);
        void Update(Borrow document);
    }
}
