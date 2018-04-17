using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAndPeace.Models
{
    public class House
    {
        public House()
        {
            Flats = new List<Flat>();
        }
        public int Id { get; set; }//dlja chevo tut set i get esli oni po idei rabotajut s privat poljami
        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Postindex { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public List<Flat> Flats { get; set; }
        
    }
    public class Flat
    {
        public Flat()
        {
            Residents = new List<Resident>();
        }
        public int Id { get; set; }//dlja chevo tut set i get esli oni po idei rabotajut s privat poljami
        public int Floor { get; set; }
        public int Number { get; set; }
        public double TotalArea { get; set; }
        public double LivingSpace { get; set; }
        public int HouseId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public House House { get; set; }
        public List<Resident> Residents { get; set; }
        //public int SVJAYJ { get; set; }????ne mogu ponjatj kak svjazatj s domom        
    }

    public class Resident
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PostCode { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public int FlatId { get; set; }
        public Flat Flat { get; set; }

    }
}
