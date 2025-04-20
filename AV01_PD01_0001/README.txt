AV01_PD01_0001 README.txt
Version: 0.1.1
(c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
https://creativecommons.org/licenses/by/4.0/

If you like my work, please consider supporting me by checking my music on YouTube:
https://youtube.com/shorts/Q921NmrtY9c


ALIGNED VERTICAL PLANNER DRAW
=============================

This is a simple C# .NET 8.0 project that draws a vertical planner using the System.Drawing library. 
The project is designed to be run in a console application, and it generates a PNG image of the planner.

The project is structured to allow for easy customization and extension.

CURRENT PROJECT TASKS
=====================

1. Refactor the code base. Some consultation and clean up is in order.
4. Setup the project to use Entity Framework Core with SQLite for data storage.
2. Define the BlockDrawings model that will be used by both cli and dta controllers.

To Do later:
3. Package BlockDrawing as a NuGet package.


HISTORY
=======

STEP 3: Add Entity Framework Core and Identity
-----------------------------------------------

dotnet ef migrations add BlockCatalogueUpdate  --context BlockCatalogueDbContext
dotnet ef database update --context BlockCatalogueDbContext

STEP 2:
----------------------------

dotnet aspnet-codegenerator identity -dc AV01_PD01_0001.Data.BlockCatalogueDbContext --files "Account.Register;Account.Login;Account.Logout;Account.Manage.Index;Account.Manage.ChangePassword;Account.Manage.Email;Account.Manage.TwoFactorAuthentication;Account.Manage.ExternalLogins"

dotnet ef migrations add InitialCreate  --context BlockCatalogueDbContext
dotnet ef database update --context BlockCatalogueDbContext

rename Identity to ApplicationUser if required and add missing using statements

STEP 1: Create a new project
----------------------------
dotnet add package Microsoft.EntityFrameworkCore.SqlServer -v 8.*
dotnet add package Microsoft.EntityFrameworkCore.Tools -v 8.*
dotnet add package Microsoft.AspNetCore.Identity.UI -v 8.*
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore -v 8.*
dotnet add package Microsoft.EntityFrameworkCore.Design -v 8.*
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design -v 8.*
dotnet add package Microsoft.EntityFrameworkCore.Sqlite -v 8.*
dotnet aspnet-codegenerator identity -dc AV01_PD01_0001.Data.ApplicationDbContext --files "Account.Register;Account.Login;Account.Logout;Account.Manage.Index;Account.Manage.ChangePassword;Account.Manage.Email;Account.Manage.TwoFactorAuthentication;Account.Manage.ExternalLogins"


2023-10-01: Initial version created by ChatGPT.