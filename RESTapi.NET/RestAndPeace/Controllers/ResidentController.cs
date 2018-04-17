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
    public class ResidentController : Controller
    {
        private readonly HouseContext _context;

        public ResidentController(HouseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Resident> GetAll()
        {
            return _context.Residents
                .Include(x => x.Flat)
                .ThenInclude(x => x.House)
                .ToList();
        }

        [HttpGet("{id}", Name = "GetResident")]
        public Resident GetById(long id)
        {
            return _context.Residents
                .Include(x => x.Flat)
                .ThenInclude(x => x.House)
                .FirstOrDefault(t => t.Id == id);
        }

        [HttpGet("~/api/flat/{flatId}/residents")]
        public IEnumerable<Resident> GetFlatsForHouse(long flatId)
        {
            return _context.Residents
                .Where(x => x.FlatId == flatId)
                .ToList();
        }
        [HttpPost]//metod dobavlenija novogo objekta v bazu
        public IActionResult Create([FromBody] Resident item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context.Residents.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetResident", new { id = item.Id }, item);
        }
        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] Resident item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var res = _context.Residents.FirstOrDefault(t => t.Id == id);
            if (res == null)
            {
                return NotFound();
            }

            res.FirstName = item.FirstName;
            res.LastName = item.LastName;
            res.PostCode = item.PostCode;
            res.Phone = item.Phone;
            res.FlatId = item.FlatId;
            //res.Flat = item.Flat;
            //res.BirdthDay = item.BirdthDay;
            

            _context.Residents.Update(res);
            _context.SaveChanges();
            return new NoContentResult();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var res = _context.Residents.FirstOrDefault(t => t.Id == id);
            if (res == null)
            {
                return NotFound();
            }

            _context.Residents.Remove(res);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}
