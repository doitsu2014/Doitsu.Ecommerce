using System;
using Doitsu.Service.Core.IdentitiesExtension;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Doitsu.Fandom.DbManager.Identity.Context
{
    public class IdentityFandomContext : IdentityDbContext<DoitsuUserInt, IdentityRole<int>, int>
    {
        public IdentityFandomContext(DbContextOptions<IdentityFandomContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }

    public class IdentityFandomContextFactory : IDesignTimeDbContextFactory<IdentityFandomContext>
    {
        public IdentityFandomContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<IdentityFandomContext>();
            optionsBuilder.UseSqlServer("Server=45.76.151.204;Database=Doitsu_Fandom_Dev;Trusted_Connection=False;User Id=sa;Password=zaQ@1234");
            return new IdentityFandomContext(optionsBuilder.Options);
        }
    }
}
