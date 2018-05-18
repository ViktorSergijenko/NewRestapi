using System;
using System.Collections.Generic;
using System.Linq;
using TESTAPI.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TESTAPI.Controllers
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
      return _context.residents
          .Include(x => x.flat)
          .ThenInclude(x => x.house)
          .ToList();
    }

    [HttpGet("{id}", Name = "GetResident")]
    public Resident GetById(long id)
    {
      return _context.residents
          .Include(x => x.flat)
          .ThenInclude(x => x.house)
          .FirstOrDefault(t => t.id == id);
    }

    [HttpGet("~/api/flat/{flatId}/residents")]
    public IEnumerable<Resident> GetFlatsForHouse(long flatId)
    {
      return _context.residents
          .Where(x => x.flatid == flatId)
          .ToList();
    }
    [HttpPost]//metod dobavlenija novogo objekta v bazu
    public IActionResult Create([FromBody] Resident item)
    {
      if (item == null)
      {
        return BadRequest();
      }

      _context.residents.Add(item);
      _context.SaveChanges();

      return CreatedAtRoute("GetResident", new { id = item.id }, item);
    }
    [HttpPut("{id}")]
    public IActionResult Update(long id, [FromBody] Resident item)
    {
      if (item == null || item.id != id)
      {
        return BadRequest();
      }

      var res = _context.residents.FirstOrDefault(t => t.id == id);
      if (res == null)
      {
        return NotFound();
      }

      res.firstname = item.firstname;
      res.lastname = item.lastname;
      res.postcode = item.postcode;
      res.phone = item.phone;
      res.flatid = item.flatid;
      res.email = item.email;
      //res.Flat = item.Flat;
      //res.BirdthDay = item.BirdthDay;


      _context.residents.Update(res);
      _context.SaveChanges();
      return new NoContentResult();
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(long id)
    {
      var res = _context.residents.FirstOrDefault(t => t.id == id);
      if (res == null)
      {
        return NotFound();
      }

      _context.residents.Remove(res);
      _context.SaveChanges();
      return new NoContentResult();
    }
  }
}
