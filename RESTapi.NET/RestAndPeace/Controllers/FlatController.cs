using System;
using System.Collections.Generic;
using System.Linq;
using RestAndPeace.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestAndPeace.Controllers
{
    [Route("api/[controller]")]//[controller]???
    public class FlatController : Controller
    {
        private readonly HouseContext _context;

        public FlatController(HouseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Flat> GetAll()
        {
            return _context.Flats
                .Include(x => x.House)
                .Include(x => x.Residents);
        }

        [HttpGet("{id}", Name = "GetFlat")]
        public Flat GetById(long id)
        {
            return _context.Flats
                .Include(x => x.House)
                .Include(x => x.Residents)
                .FirstOrDefault(t => t.Id == id);
        }

        [HttpGet("~/api/house/{houseId}/flats")]
        public IEnumerable<Flat> GetFlatsForHouse(long houseId)
        {
            return _context.Flats
                .Where(x => x.HouseId == houseId)
                .ToList();
        }
        [HttpPost]//metod dobavlenija novogo objekta v bazu
        public IActionResult Create([FromBody] Flat item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context.Flats.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetFlat", new { id = item.Id }, item);
        }
        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] Flat item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var Flat = _context.Flats.FirstOrDefault(t => t.Id == id);
            if (Flat == null)
            {
                return NotFound();
            }

            Flat.Floor = item.Floor;
            Flat.Number = item.Number;
            Flat.TotalArea = item.TotalArea;
            Flat.LivingSpace = item.LivingSpace;
            Flat.HouseId = item.HouseId;
           
            _context.Flats.Update(Flat);
            _context.SaveChanges();
            return new NoContentResult();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var Flat = _context.Flats.FirstOrDefault(t => t.Id == id);
            if (Flat == null)
            {
                return NotFound();
            }

            _context.Flats.Remove(Flat);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}
