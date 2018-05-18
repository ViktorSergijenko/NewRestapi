using System;
using System.Collections.Generic;
using System.Linq;
using RestAndPeace.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestAndPeace.Controllers
{
    [Route("api/[controller]")]//[controller]???
    [EnableCors("AllowAnyOrigin")]
    public class HouseController : Controller
    {
        private readonly HouseContext _context;

        public HouseController(HouseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<House> GetAll()
        {
            Init();
           
            var houses = _context.Houses
                .Include(x => x.Flats)
                .ThenInclude(x => x.Residents)
                .ToList();

            return houses;
        }

        [HttpGet("{id}", Name = "GetHouse")]
        public House GetById(long id)
        {
           
            return _context.Houses
                .Include(x => x.Flats)
                .ThenInclude(x => x.Residents)
                .FirstOrDefault(t => t.Id == id);
           
        }

        [HttpGet("init")]
        public int Init()
        {
            Random r = new Random();
            if (_context.Houses.Count() == 0)
            {
                for (int houseInc = 0; houseInc < 2; houseInc++)
                {
                    var newHouse = new House { Street = $"Liela Iela-{houseInc}", City = "Jelgava City", Country = "Latvia", Postindex = $"LV300{houseInc}" };

                    for (int flatInc = 0; flatInc < 2; flatInc++)
                    {
                        var newFlat = new Flat { Number = flatInc, Floor = r.Next(1, 5), LivingSpace = r.Next(100, 300) / 11, TotalArea = r.Next(100, 300) / 9 };
                        
                        for (int resInc = 0; resInc < 2; resInc++)
                        {
                            newFlat.Residents.Add(new Resident { FirstName = $"Some-{resInc}", LastName = "Dude" });

                        }
                        newHouse.Flats.Add(newFlat);
                    }

                    _context.Houses.Add(newHouse);
                }
                return _context.SaveChanges();
            }
            return 0;
        }
        [HttpPost]//metod dobavlenija novogo objekta v bazu
        public IActionResult Create([FromBody] House item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context.Houses.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetHouse", new { id = item.Id }, item);
        }
        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] House item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var House = _context.Houses.FirstOrDefault(t => t.Id == id);
            if (House == null)
            {
                return NotFound();
            }

            House.Street = item.Street;
            House.City = item.City;
            House.Country = item.Country;
            House.Postindex = item.Postindex;
      
            //House.Modified = DateTime.Now;
            _context.Houses.Update(House);
            _context.SaveChanges();
            return new NoContentResult();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var House = _context.Houses.FirstOrDefault(t => t.Id == id);
            if (House == null)
            {
                return NotFound();
            }

            _context.Houses.Remove(House);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}
