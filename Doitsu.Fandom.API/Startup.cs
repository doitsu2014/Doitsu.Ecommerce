
using Doitsu.Fandom.DBManager;
using Doitsu.Service.Core.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IO;
using System.Net;
using System.Text;

namespace Doitsu.Ecommerce.API
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
            RootConfig.Entry(services, Configuration);

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", builder =>
                    builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            services.Configure<ForwardedHeadersOptions>(options =>
            {
            });

            services.AddMvc().SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);

            // Swagger Configuration
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerDocument(c =>
            {
                c.DocumentName = "Doitsu Fandom Api";
                c.Version = "1.6";
                c.Title = "Doitsu Fandom Api";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMiddleware<ApiLoggingMiddleware>();

            // Shows UseCors with named policy.
            app.UseCors("AllowSpecificOrigin");
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                   Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", Configuration.GetSection("ImageContainerPath").Value)),
                RequestPath = $"/{Configuration.GetSection("ImageContainerPath").Value}"
            });

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });


            app.UseAuthentication();
            app.UseMvc();

            // Swagger configuration
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwagger();
            app.UseSwaggerUi3();

        }
    }
}
