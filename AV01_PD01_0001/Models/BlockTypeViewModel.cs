/*
    Models/MovieGenreViewModel.cs
    Version: 1.0.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/

    This work builds upon concepts and examples from:
    "Get started with ASP.NET Core MVC | Microsoft Learn"
    https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-8.0&tabs=visual-studio

   Please support me by checking out my music on YouTube:
    https://youtube.com/shorts/Q921NmrtY9c
    Leave a good comment and a thumbs up.
    Thank you for your support!
*/

using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;


namespace AV01_PD01_0001.Models
{

    public class BlockTypeViewModel
    {
        public List<Block>? Movies { get; set; }
        public SelectList? Category { get; set; }
        public string? BlockCategory { get; set; }
        public string? SearchString { get; set; }
    }
}