/*
    Data/MovieDbContext.cs
    Version: 1.0.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    This work builds upon concepts and examples from:
    "Get started with ASP.NET Core MVC | Microsoft Learn"
    https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-8.0&tabs=visual-studio
*/
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using AV01_PD01_0001.Models;

namespace AV01_PD01_0001.Data
{

    public class BlockCatalogueDbContext : IdentityDbContext<ApplicationUser>
    {
        public BlockCatalogueDbContext(DbContextOptions<BlockCatalogueDbContext> options) : base(options) { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Comment> Comments { get; set; } // Add this line

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the relationship between Movie and Comment
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Movie)
                .WithMany(m => m.Comments)
                .HasForeignKey(c => c.MovieId)
                .OnDelete(DeleteBehavior.Cascade); // If a movie is deleted, delete its comments

            // Configure the relationship between ApplicationUser and Comment
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany() // Or .WithMany(u => u.Comments) if you add a ICollection<Comment> to ApplicationUser
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade); // If a user is deleted, delete their comments
        }
    }

}