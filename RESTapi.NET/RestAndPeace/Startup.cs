using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RestAndPeace.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;


namespace RestAndPeace
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<HouseContext>(opt => opt.UseInMemoryDatabase("HouseList"));
            services.AddDbContext<HouseContext>(opt => opt.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=EFProviders.InMemory;Trusted_Connection=True;"));
            services.AddMvc()
                .AddJsonOptions(o => o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin",
                    builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()

                    );
            }
            );
            
        }

        public void Configure(IApplicationBuilder app,IHostingEnvironment env)
        {
            
            app.UseMvc();
            app.UseCors("AllowAnyOrigin");
        }
    }
}
