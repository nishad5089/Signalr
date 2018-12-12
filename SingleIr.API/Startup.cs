using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SingleIr.API.Data;
using SingleIr.API.Hubs;

namespace Single.Ir.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration) 
        {
            this.Configuration = configuration;
               
        }
         public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        { 
            
             services.AddSignalR();
             services.AddCors();
              services.AddMvc();
             
                 services.AddDbContext<EmployeeDbContext>(options =>
                 options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
   
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(x=>x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials());       
         
            app.UseSignalR(route =>   
                {  
                    route.MapHub<EmployeeHub> ("/employee");  
                });  
            app.UseMvc();
        }
    }
}
