
using System;
using AutoMapper;
using Doitsu.DBManager.Fandom.Services;
using Doitsu.Fandom.DbManager.Identity.Context;
using Doitsu.Fandom.DbManager.Models;
using Doitsu.Fandom.DBManager.ViewModels;
using Doitsu.Service.Core;
using Doitsu.Service.Core.AuthorizeBuilder;
using Doitsu.Service.Core.IdentitiesExtension;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Doitsu.Fandom.DBManager
{
    /// <summary>
    /// Is the api endpoint config to help build a web app fastly
    /// The core destination is: 
    /// + Config Identity with JWT
    /// + Config Main DB context
    /// + Config Service Dependency
    /// + Config Repo Dependency
    /// + Config Autmapper
    /// How to use:
    /// + Use should add to your config
    /// ++ Doitsu.Identity.DevDB key, value
    /// ++ Doitsu.Ecommerce.DevDB key, value
    /// </summary>
    public static class RootConfig
    {

        public static void Entry(IServiceCollection services, IConfiguration configuration)
        {
            //Doitsu.Identity.DBConStr
            #region Main Database Config
            // Config db context basic
            services.AddDbContext<FandomDbContext>(options =>
                            options.UseSqlServer(configuration.GetConnectionString("Doitsu.DBConStr")));

            // Config identity db config
            services.AddDbContext<IdentityFandomContext>(options =>
                            options.UseSqlServer(configuration.GetConnectionString("Doitsu.Identity.DBConStr")));

            services.AddIdentity<DoitsuUserInt, IdentityRole<int>>()
                .AddEntityFrameworkStores<IdentityFandomContext>()
                .AddDefaultTokenProviders();

            // Inject DbContext
            // Inject Identity Manager
            // Inject UOW
            services.AddScoped(typeof(DbContext), typeof(FandomDbContext));
            services.AddScoped(typeof(DoitsuUserIntManager));
            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));

            DoitsuJWTServiceBuilder.BuildJWTService(services);
            #endregion

            #region DI Config
            services.AddScoped(typeof(IProductService), typeof(ProductService));
            services.AddScoped(typeof(IArtistService), typeof(ArtistService));
            services.AddScoped(typeof(IProductCollectionService), typeof(ProductCollectionService));
            services.AddScoped(typeof(IBlogService), typeof(BlogService));
            services.AddScoped(typeof(IBlogCategoryService), typeof(BlogCategoryService));
            #endregion

            #region Mapper Config
            var autoMapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMissingTypeMaps = true;
                cfg.CreateMap<ArtistViewModel, Artist>()
                    .ForMember(x => x.Blogs, y => y.Ignore())
                    .ForMember(x => x.Products, x => x.Ignore());
                cfg.CreateMap<ProductCollectionViewModel, ProductCollections>()
                    .ForMember(x => x.Products, y => y.Ignore())
                    .ForMember(x => x.Artist, y => y.Ignore());
                cfg.CreateMap<ProductCollections, ProductCollectionViewModel>()
                    .ForMember(x => x.ListProducts, y => y.Ignore());
                cfg.CreateMap<ProductViewModel, Products>()
                    .ForMember(x => x.Artist, y => y.Ignore());
                cfg.CreateMap<BlogViewModel, Blogs>()
                    .ForMember(x => x.BlogCategory, y => y.Ignore())
                    .ForMember(x => x.DraftTime, y => y.Condition(o => o.DraftTime > DateTime.MinValue));
                cfg.CreateMap<BlogCategoryViewModel, BlogCategories>()
                    .ForMember(x => x.Blogs, y => y.Ignore());
                cfg.CreateMap<BlogCategories, BlogCategoryViewModel>();
            });
            IMapper mapper = autoMapperConfig.CreateMapper();
            services.AddSingleton(mapper);
            #endregion
        }


        private static void ConfigAutoMapper(IMapperConfigurationExpression config)
        {
            config.CreateMissingTypeMaps = true;
            config.AllowNullDestinationValues = false;
        }
    }


}
