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
    [Route("api/[controller]/[action]")]
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
        public ActionResult<BorrowInfo> GetBorrow(string id)
        {
            var borrow = borrowDac.Get(it => it.Id == id);
            var item = itemDac.Get(it => it.Id == borrow.ItemId);

            return new BorrowInfo
            {
                Id = borrow.Id,
                ItemId = item.Id,
                Name = item.Name,
                Owner = borrow.Owner,
                Approver = borrow.Approver,
                Slot = item.Slot
            };
        }

        [HttpGet("{username}")]
        public ActionResult<IEnumerable<BorrowInfo>> GetMyBorrow(string username)
        {
            var borrow = borrowDac.List(it => (it.Owner != null && it.Approver != null) && ( it.Owner == username || it.Approver == username))
                .GroupBy(x => x.ItemId).Select(x => x.First());
            var model = borrow.Select(it =>
            {
                var item = itemDac.Get(t => t.Id == it.ItemId);
                return new BorrowInfo
                {
                    Id = it.Id,
                    ItemId = item.Id,
                    Name = item.Name,
                    Owner = it.Owner,
                    Approver = it.Approver,
                    Slot = item.Slot
                };

            });

            return model.ToList();
        }

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
            var borrow = borrowDac.Get(it => it.ItemId == id && it.Owner == name);
            if (borrow != null) return new OkObjectResult(new { Id = borrow.Id });
            var genid = Guid.NewGuid().ToString();
            borrowDac.Create(new Borrow
            {
                Id = genid,
                ItemId = id,
                Owner = name,
                CreateAt = DateTime.UtcNow
            });

            return new OkObjectResult(new { Id = genid});
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

        [HttpGet("{id}")]
        public ActionResult ReturnItem(string id)
        {
            var borrow = borrowDac.Get(it => it.Id == id);
            var item = itemDac.Get(it => it.Id == borrow.ItemId);
            borrowDac.Remove(borrow);
            item.IsBorrow = false;
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
                Slot = model.Slot,
                IsBorrow = false,
                CreateAt = DateTime.UtcNow
            });

            return Ok();
        }
        
    }
}
