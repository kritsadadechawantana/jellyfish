using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using serverapi.Dac;
using serverapi.Dac.Contract;
using Swashbuckle.AspNetCore.Swagger;

namespace serverapi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
            });
            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            var dbConfig = Configuration.GetSection(nameof(DatabaseConfigurations)).Get<DatabaseConfigurations>();
            services.AddTransient<DatabaseConfigurations>(svc => dbConfig);
            services.AddTransient<IItemDac, ItemDac>();
            services.AddTransient<ISlotDac, SlotDac>();
            services.AddTransient<IBorrowDac, BorrowDac>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseCors(builder =>
               builder.WithOrigins("*")
               .AllowAnyHeader()
               .AllowAnyMethod()
           );

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
