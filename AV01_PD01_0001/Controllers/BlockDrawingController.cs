/*
    Program.cs
    Version: 0.1.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/
*/
using AV01_PD01_0001.Data;
using AV01_PD01_0001.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace VA01_PD01_0001.Controllers
{
    public class BlockDrawingController : Controller
    {
        private readonly BlockCatalogueDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public BlockDrawingController(BlockCatalogueDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            return RedirectToAction("Index", "BlockDrawing");
        }

        [AllowAnonymous]
        public IActionResult BlockDrawing()
        {
            return View();
        }
    }
}
