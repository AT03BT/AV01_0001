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
builder.Services.AddDbContext<BlockCatalogueDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")));
//builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>() // Add roles
    .AddEntityFrameworkStores<BlockCatalogueDbContext>();

builder.Services.AddScoped<UserManager<ApplicationUser>, CustomUserManager>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AuthenticatedUsers", policy =>
        policy.RequireAuthenticatedUser());

    options.AddPolicy("CanEditMovies", policy =>
        policy.RequireAuthenticatedUser()
               .RequireRole("Admin", "Editor"));

    options.AddPolicy("CanMakeBaseBlocks", policy =>
        policy.RequireAuthenticatedUser()
               .RequireRole("Admin", "Editor", "User"));

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
    pattern: "{controller=Home}/{action=Index}/{id?}");
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
        var adminUser = await userManager.FindByEmailAsync("benoit@thebase.net");
        if (adminUser != null)
        {
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
        adminUser = await userManager.FindByEmailAsync("georg@thebase.net");
        if (adminUser != null)
        {
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
        adminUser = await userManager.FindByEmailAsync("helg@thebase.net");
        if (adminUser != null)
        {
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
        adminUser = await userManager.FindByEmailAsync("waclaw@thebase.net");
        if (adminUser != null)
        {
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
    }
}
app.Run();
