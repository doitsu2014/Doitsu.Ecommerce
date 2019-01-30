using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Doitsu.Fandom.DbManager.Models
{
    public partial class FandomDbContext : DbContext
    {
        public FandomDbContext()
        {
        }

        public FandomDbContext(DbContextOptions<FandomDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Artist> Artist { get; set; }
        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<BlogCategories> BlogCategories { get; set; }
        public virtual DbSet<BlogVideos> BlogVideos { get; set; }
        public virtual DbSet<Blogs> Blogs { get; set; }
        public virtual DbSet<Categories> Categories { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<ProductCollections> ProductCollections { get; set; }
        public virtual DbSet<Products> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.1-servicing-10028");

            modelBuilder.Entity<Artist>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Code).HasMaxLength(75);

                entity.Property(e => e.Name).HasMaxLength(250);
            });

            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<BlogCategories>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Name).HasMaxLength(500);

                entity.Property(e => e.UpdatedTime).HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<BlogVideos>(entity =>
            {
                entity.HasIndex(e => e.BlogId);

                entity.HasIndex(e => new { e.Title, e.UploadTime });

                entity.Property(e => e.UpdateTime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UploadTime).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Blog)
                    .WithMany(p => p.BlogVideos)
                    .HasForeignKey(d => d.BlogId);
            });

            modelBuilder.Entity<Blogs>(entity =>
            {
                entity.HasIndex(e => e.ArtistId);

                entity.HasIndex(e => e.BlogCategoryId);

                entity.HasIndex(e => e.PublisherId);

                entity.HasIndex(e => new { e.DraftTime, e.PublishTime, e.Title, e.Slug, e.BlogCategoryId });

                entity.Property(e => e.ArtistId).HasColumnName("ArtistID");

                entity.Property(e => e.BlogCategoryId).HasColumnName("BlogCategoryID");

                entity.Property(e => e.Code).HasMaxLength(50);

                entity.Property(e => e.DraftTime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsPublished)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ThumbnailUrl).HasColumnName("ThumbnailURL");

                entity.Property(e => e.Title).HasMaxLength(500);

                entity.Property(e => e.UpdateTime).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.Blogs)
                    .HasForeignKey(d => d.ArtistId);

                entity.HasOne(d => d.BlogCategory)
                    .WithMany(p => p.Blogs)
                    .HasForeignKey(d => d.BlogCategoryId);
            });

            modelBuilder.Entity<Categories>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<ProductCollections>(entity =>
            {
                entity.HasIndex(e => e.CategoryId);

                entity.HasIndex(e => new { e.ArtistId, e.Type, e.Slug, e.Name, e.CreatedTime });

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ArtistId).HasColumnName("ArtistID");

                entity.Property(e => e.CreatedTime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.ThumbnailUrl).HasColumnName("ThumbnailURL");

                entity.Property(e => e.UpdatedTime).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.ProductCollections)
                    .HasForeignKey(d => d.ArtistId);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.ProductCollections)
                    .HasForeignKey(d => d.CategoryId);
            });

            modelBuilder.Entity<Products>(entity =>
            {
                entity.HasIndex(e => e.ArtistId);

                entity.HasIndex(e => e.CateId);

                entity.HasIndex(e => e.CollectionId);

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedTime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.ResourceUrl).HasColumnName("ResourceURL");

                entity.Property(e => e.ThumbnailUrl).HasColumnName("ThumbnailURL");

                entity.Property(e => e.UpdatedTime).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.ArtistId);

                entity.HasOne(d => d.Cate)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CateId);

                entity.HasOne(d => d.Collection)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CollectionId);
            });
        }
    }
}
