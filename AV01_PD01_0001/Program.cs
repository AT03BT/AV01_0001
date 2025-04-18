/*
    Program.cs
    Version: 0.1.1
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/
*/

using AV01_PD01_0001.Models;
using AV01_PD01_0001.Data;
using AV01_PD01_0001.Areas.Identity.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var SEED_DATA = true;
var ADD_ROLES = true;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>() // Add roles
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddScoped<UserManager<ApplicationUser>, CustomUserManager>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AuthenticatedUsers", policy =>
        policy.RequireAuthenticatedUser());

    options.AddPolicy("CanEditMovies", policy =>
        policy.RequireAuthenticatedUser()
               .RequireRole("Admin", "Editor"));

    options.AddPolicy("CanMakeComments", policy =>
        policy.RequireAuthenticatedUser()
               .RequireRole("Admin", "Editor", "User"));
});

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    if (SEED_DATA == true)
    {
        SeedData.Initialize(services);
    }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Movies}/{action=Index}/{id?}");
app.MapRazorPages();

if (ADD_ROLES == true)
{
    using (var scope = app.Services.CreateScope())
    {
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new IdentityRole("Admin"));
        }

        if (!await roleManager.RoleExistsAsync("Editor"))
        {
            await roleManager.CreateAsync(new IdentityRole("Editor"));
        }

        if (!await roleManager.RoleExistsAsync("User"))
        {
            await roleManager.CreateAsync(new IdentityRole("User"));
        }

        // Assign a user to a role (example)
        var adminUser = await userManager.FindByEmailAsync("@outlook.com");
        if (adminUser != null)
        {
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
        var adminUser2 = await userManager.FindByEmailAsync("jeffry@outlook.com");
        if (adminUser2 != null)
        {
            await userManager.AddToRoleAsync(adminUser2, "Admin");
        }
        var adminUser3 = await userManager.FindByEmailAsync("jeffry@outlook.com");
        if (adminUser3 != null)
        {
            await userManager.AddToRoleAsync(adminUser3, "Admin");
        }
    }
}
app.Run();
