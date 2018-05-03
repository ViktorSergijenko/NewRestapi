using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TESTAPI.Models
{
    public class HouseContext : DbContext
    {
        public HouseContext(DbContextOptions<HouseContext> options)
           : base(options)
        {
          // Database.EnsureDeleted();
            Database.EnsureCreated();
            //System.Data.SqlClient.SqlException: 'Database 'EFProviders.InMemory' already exists. Choose a different database name.'

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<House>()
                .HasMany(x => x.flats)
                .WithOne(x => x.house)
                .HasForeignKey(x => x.houseid)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade)
            ;
            

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<House> Houses { get; set; }
        public DbSet<Flat> flats { get; set; }
    }
}
