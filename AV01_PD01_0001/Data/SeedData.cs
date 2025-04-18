/*
    Data/SeedData.cs
    Version: 1.0.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    This work builds upon concepts and examples from:
    "Get started with ASP.NET Core MVC | Microsoft Learn"
    https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-8.0&tabs=visual-studio
*/

using Microsoft.EntityFrameworkCore;
using AV01_PD01_0001.Models;
using Microsoft.Extensions.DependencyInjection;
using AV01_PD01_0001.Data;
using System;
using System.Linq;

namespace AV01_PD01_0001.Models;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new BlockCatalogueDbContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<BlockCatalogueDbContext>>()))
        {
            // Look for any movies.
            if (context.Movies.Any())
            {
                return;   // DB has been seeded
            }
            context.Movies.AddRange(
                new Block
                {
                    Title = "CB01_01",
                    ReleaseDate = DateTime.Parse("1989-2-12"),
                    Genre = "Circuit Breaker",
                    Rating = "R",
                    Price = 7.99M
                },
                new Block
                {
                    Title = "BB 01 24",
                    ReleaseDate = DateTime.Parse("1984-3-13"),
                    Genre = "Base Block",
                    Rating = "MA",
                    Price = 8.99M
                },
                new Block
                {
                    Title = "CT 00 01",
                    ReleaseDate = DateTime.Parse("1986-2-23"),
                    Genre = "Contactor",
                    Rating = "MA",
                    Price = 9.99M
                },
                new Block
                {
                    Title = "BB01_01",
                    ReleaseDate = DateTime.Parse("1959-4-15"),
                    Genre = "Base Block",
                    Rating = "AO",
                    Price = 3.99M
                }
            );
            context.SaveChanges();
        }
    }
}