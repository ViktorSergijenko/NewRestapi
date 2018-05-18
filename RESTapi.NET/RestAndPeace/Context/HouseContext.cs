using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace RestAndPeace.Models
{
    public class HouseContext : DbContext
    {
        public HouseContext(DbContextOptions<HouseContext> options)
            : base(options)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
            //System.Data.SqlClient.SqlException: 'Database 'EFProviders.InMemory' already exists. Choose a different database name.'

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<House>()
                .HasMany(x => x.Flats)
                .WithOne(x => x.House)
                .HasForeignKey(x => x.HouseId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade)
            ;
            modelBuilder.Entity<Flat>()
                .HasMany(x => x.Residents)
                .WithOne(x => x.Flat)
                .HasForeignKey(x => x.FlatId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade)
            ;

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<House> Houses { get; set; }//zasovivaet vse objekti klassa House v peremennuju HouseItems
        public DbSet<Flat> Flats { get; set; }
        public DbSet<Resident> Residents { get; set; }
    }
}
