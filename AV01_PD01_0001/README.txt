AV01_PD01_0001 README.txt
Version: 0.1.0
(c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
https://creativecommons.org/licenses/by/4.0/

ALIGNED VERTICAL PLANNER DRAW
=============================


HISTORY
=======

STEP 2:
----------------------------



STEP 1: Create a new project
----------------------------
dotnet add package Microsoft.EntityFrameworkCore.SqlServer -v 8.*
dotnet add package Microsoft.EntityFrameworkCore.Tools -v 8.*
dotnet add package Microsoft.AspNetCore.Identity.UI -v 8.*
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore -v 8.*
dotnet add package Microsoft.EntityFrameworkCore.Design -v 8.*
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design -v 8.*
dotnet add package Microsoft.EntityFrameworkCore.Sqlite -v 8.*
dotnet aspnet-codegenerator identity -dc MC01_0001.Data.ApplicationDbContext --files "Account.Register;Account.Login;Account.Logout;Account.Manage.Index;Account.Manage.ChangePassword;Account.Manage.Email;Account.Manage.TwoFactorAuthentication;Account.Manage.ExternalLogins"


2023-10-01: Initial version created by ChatGPT.