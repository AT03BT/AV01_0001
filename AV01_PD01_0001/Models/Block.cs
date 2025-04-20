/*
    Models/Movie.cs
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

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AV01_PD01_0001.Models
{
    public class Block
    {
        public int Id { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string? Title { get; set; }

        [RegularExpression(@"^[A-Z]+[a-zA-Z\s]*$")]
        [Required]
        [StringLength(30)]
        public string? Type { get; set; }

        [RegularExpression(@"^\*{0,5}$", ErrorMessage = "Rating must be between 0 and 5 stars.")]
        [StringLength(5)]
        public string? Rating { get; set; }

        public ICollection<Comment>? Comments { get; set; } // Add this line
    }


    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow; // Set to current time by default

        // Foreign key to the Movie
        public int BlockId { get; set; }
        public Block Block { get; set; }

        // Foreign key to the User (ApplicationUser)
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
