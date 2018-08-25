using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using serverapi.Dac.Contract;
using serverapi.Models;
using serverapi.Models.DTO;

namespace serverapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemDac itemDac;
        private readonly ISlotDac slotDac;
        private readonly IBorrowDac borrowDac;

        public ItemController(IItemDac itemDac, ISlotDac slotDac, IBorrowDac borrowDac)
        {
            this.itemDac = itemDac;
            this.slotDac = slotDac;
            this.borrowDac = borrowDac;
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Item>> Get()
        {
            return itemDac.List((it) => true).ToList();
        }

        [HttpGet]
        public ActionResult<IEnumerable<Item>> AvailableItem()
        {
            return itemDac.List(it => it.IsBorrow == false).ToList();
        }

        [HttpGet("{id}/{name}")]
        public ActionResult BorrowItem(string id, string name)
        {
            borrowDac.Create(new Borrow
            {
                Id = Guid.NewGuid().ToString(),
                ItemId = id,
                Owner = name,
                CreateAt = DateTime.UtcNow
            });

            return Ok();
        }

        [HttpGet("{id}/{name}")]
        public ActionResult ApproveBorrow(string id, string name)
        {
            var borrow = borrowDac.Get(it => it.Id == id);
            borrow.Approver = name;

            borrowDac.Update(borrow);
            var item = itemDac.Get(it => it.Id == borrow.ItemId);
            item.IsBorrow = true;
            itemDac.Update(item);

            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<Slot>> Slots()
        {
            return slotDac.List(it => it.IsContain != true).ToList();
        }

        [HttpPost()]
        public ActionResult AddItem([FromBody]Item model)
        {
            itemDac.Create(new Item
            {
                Id = Guid.NewGuid().ToString(),
                Name = model.Name,
                Slot = model.Slot
            });

            return Ok();
        }
        
    }
}
