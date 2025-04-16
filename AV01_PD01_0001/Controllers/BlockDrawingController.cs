/*
    Program.cs
    Version: 0.1.0
    (c) 2024, Minh Tri Tran, with assistance from Google's Gemini - Licensed under CC BY 4.0
    https://creativecommons.org/licenses/by/4.0/
*/
using Microsoft.AspNetCore.Mvc;

namespace VA01_PD01_0001.Controllers
{
    public class BlockDrawingController : Controller
    {
        public IActionResult Index()
        {
            return RedirectToAction("Index", "BlockDrawing");
        }

        public IActionResult BlockDrawing()
        {
            return View();
        }
    }
}
