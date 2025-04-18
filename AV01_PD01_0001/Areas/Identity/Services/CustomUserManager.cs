/*
    Data/MovieDbContext.cs
    Version: 1.0.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/
*/
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

using AV01_PD01_0001.Models;

namespace AV01_PD01_0001.Areas.Identity.Services;


public class CustomUserManager : UserManager<ApplicationUser>
{
    public CustomUserManager(IUserStore<ApplicationUser> store, IOptions<IdentityOptions> optionsAccessor, IPasswordHasher<ApplicationUser> passwordHasher, IEnumerable<IUserValidator<ApplicationUser>> userValidators, IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators, ILookupNormalizer keyNormalizer, IdentityErrorDescriber errors, IServiceProvider services, ILogger<UserManager<ApplicationUser>> logger)
        : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
    {
    }

    public override async Task<IdentityResult> CreateAsync(ApplicationUser user, string password)
    {
        var result = await base.CreateAsync(user, password);

        if (result.Succeeded)
        {
            // Perform post-processing here
            await PerformPostRegistrationTasks(user);
        }

        return result;
    }

    private async Task PerformPostRegistrationTasks(ApplicationUser user)
    {
        // Example: Send a welcome email
        // Example: Add the user to a specific role
        // Example: Initialize user profile data
        // Example: Log user registration
        Console.WriteLine("Post-registration tasks completed");
    }
}