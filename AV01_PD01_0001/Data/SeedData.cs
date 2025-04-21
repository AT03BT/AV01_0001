/*
    Data/SeedData.cs
    Version: 0.0.1
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    This work builds upon concepts and examples from:
    "Get started with ASP.NET Core MVC | Microsoft Learn"
    https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-8.0&tabs=visual-studio

    I need your help, support me by checking out my music on YouTube:
    https://youtube.com/shorts/Q921NmrtY9c
    Leave a good comment and a thumbs up.
    Thank you for your support!
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
            // Look for any blocks.
            if (context.Blocks.Any())
            {
                return;   // DB has been seeded
            }
            context.Blocks.AddRange(
                new Block
                {
                    Title = "CB01_01",
                    Type = "Circuit Breaker",
                    Rating = "**",
                },
                new Block
                {
                    Title = "BB 01 24",
                    Type = "Base Block",
                    Rating = "*",
                },
                new Block
                {
                    Title = "CT 00 01",
                    Type = "Contactor",
                    Rating = "****",
                },
                new Block
                {
                    Title = "BB01_01",
                    Type = "Base Block",
                    Rating = "*****",
                }
            );
            context.SaveChanges();
        }
    }
}