using System;
using System.Collections.Generic;
using System.Linq;
using TESTAPI.Models;//tut nahoditsja moja modelj
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TESTAPI.Controllers
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
                .Include(x => x.flats)
                .ThenInclude(x => x.residents)
                .ToList();

            return houses;
        }

        [HttpGet("{id}", Name = "GetHouse")]
        public House GetById(long id)
        {

            return _context.Houses
                .Include(x => x.flats)
                .ThenInclude(x => x.residents)
                .FirstOrDefault(t => t.id == id);

        }

        [HttpGet("init")]
        public int Init()
        {
            Random r = new Random();
            if (_context.Houses.Count() == 0)
            {
                for (int houseInc = 0; houseInc < 2; houseInc++)
                {
                    var newHouse = new House { street = $"Liela Iela-{houseInc}", city = "Jelgava City", country = "Latvia", postindex = $"LV300{houseInc}" };
                    for (int flatInc = 0; flatInc < 2; flatInc++)
                    {
                        var newFlat = new Flat { number = flatInc, floor = r.Next(1, 5), livingspace = r.Next(100, 300) / 11, totalarea = r.Next(100, 300) / 9};

                          for (int resInc = 0; resInc < 2; resInc++)
                          {
                            newFlat.residents.Add(new Resident { firstname = $"Some-{resInc}", lastname = "Dude" });

                          }
                          newHouse.flats.Add(newFlat);
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

            return CreatedAtRoute("GetHouse", new { id = item.id }, item);
        }
        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] House item)
        {
            if (item == null || item.id != id)
            {
                return BadRequest();
            }

            var House = _context.Houses.FirstOrDefault(t => t.id == id);
            if (House == null)
            {
                return NotFound();
            }

            House.street = item.street;
            House.city = item.city;
            House.country = item.country;
            House.postindex = item.postindex;
            _context.Houses.Update(House);
            _context.SaveChanges();
            return new NoContentResult();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var House = _context.Houses.FirstOrDefault(t => t.id == id);
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
