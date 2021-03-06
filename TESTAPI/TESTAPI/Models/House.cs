using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace TESTAPI.Models
{
    public class House
    {

        public House()
        {
            flats = new List<Flat>();
        }
        public int id { get; set; }//dlja chevo tut set i get esli oni po idei rabotajut s privat poljami
        public string street { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string postindex { get; set; }
        public List<Flat> flats { get; set; }
    }
    public class Flat
    {
        public Flat()
        {
          residents = new List<Resident>();
        }
        public int id { get; set; }//dlja chevo tut set i get esli oni po idei rabotajut s privat poljami
        public int floor { get; set; }
        public int number { get; set; }
        public double totalarea { get; set; }
        public double livingspace { get; set; }
        public int houseid { get; set; }
        public House house { get; set; }
        public List<Resident> residents { get; set; }
    }
        public class Resident
         {
          public int id { get; set; }
          public string firstname { get; set; }
          public string lastname { get; set; }
          public string postcode { get; set; }
          public string phone { get; set; }
          public string email { get; set; }
          public int flatid { get; set; }
          public Flat flat { get; set; }

         }

}
