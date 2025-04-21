/*
    Controllers/BlockCatalogueController.cs
    Version: 0.0.1
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
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

using AV01_PD01_0001.Data;
using AV01_PD01_0001.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;


namespace AV01_PD01_0001.Controllers
{
    public class BlockingCatalogueController : Controller
    {
        private readonly BlockCatalogueDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public BlockingCatalogueController(BlockCatalogueDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [AllowAnonymous]
        public async Task<IActionResult> Index(string blockCategory, string searchString)
        {
            if (_context.Blocks == null)
            {
                return Problem("Entity set 'BlockCatalogueDbContext.Blocks'  is null.");
            }

            // Use LINQ to get list of genres.
            IQueryable<string> genreQuery = from m in _context.Blocks
                                            orderby m.Type
                                            select m.Type;
            var blocks = from m in _context.Blocks
                         select m;

            if (!string.IsNullOrEmpty(searchString))
            {
                blocks = blocks.Where(s => s.Title!.ToUpper().Contains(searchString.ToUpper()));
            }

            if (!string.IsNullOrEmpty(blockCategory))
            {
                blocks = blocks.Where(x => x.Type == blockCategory);
            }

            var blockCategoryVm = new BlockTypeViewModel
            {
                Category = new SelectList(await genreQuery.Distinct().ToListAsync()),
                Blocks = await blocks.ToListAsync()
            };

            return View(blockCategoryVm);
        }


        [AllowAnonymous] // Assuming you want anyone to see comments
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var block = await _context.Blocks
                .Include(m => m.Comments) // Eager load comments
                .FirstOrDefaultAsync(m => m.Id == id);

            if (block == null)
            {
                return NotFound();
            }

            return View(block);
        }


        [HttpPost]
        [Authorize(Policy = "AuthenticatedUsers")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateComment(int blockId, string content)
        {
            if (string.IsNullOrEmpty(content))
            {
                return BadRequest("Comment content is required."); // Or handle this more gracefully
            }

            var block = await _context.Blocks.FindAsync(blockId);
            if (block == null)
            {
                return NotFound();
            }

            var user = await _userManager.GetUserAsync(User); // Get the current user
            if (user == null)
            {
                return Unauthorized(); // Or handle this more gracefully
            } else
            {

            }

            var comment = new Comment
            {
                Block = block,
                Content = content,
                User = user
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return RedirectToAction("Details", new { id = blockId }); // Redirect back to details page
        }


       
        [Authorize(Policy = "CanEditBlocks")]
        public IActionResult Create()
        {
            return View();
        }


        // POST: BlockCatalogue/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Authorize(Policy = "CanEditBlocks")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,Type,Rating")] Block block)
        {
            if (ModelState.IsValid)
            {
                _context.Add(block);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(block);
        }


        // GET: BlockCatalogue/Edit/5
        [Authorize(Policy = "CanEditBlocks")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var block = await _context.Blocks.FindAsync(id);
            if (block == null)
            {
                return NotFound();
            }
            return View(block);
        }


        // POST: BlockCatalogue/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Authorize(Policy = "CanEditBlocks")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,ReleaseDate,Genre,Price,Rating")] Block block)
        {
            if (id != block.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(block);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BlockExists(block.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(block);
        }


        // GET: BlockCatalogue/Delete/5
        [Authorize(Policy = "CanEditBlocks")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var block = await _context.Blocks
                .FirstOrDefaultAsync(m => m.Id == id);
            if (block == null)
            {
                return NotFound();
            }

            return View(block);
        }


        // POST: BlockCatalogue/Delete/5
        [Authorize(Policy = "CanEditBlocks")]
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var block = await _context.Blocks.FindAsync(id);
            if (block != null)
            {
                _context.Blocks.Remove(block);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }


        private bool BlockExists(int id)
        {
            return _context.Blocks.Any(e => e.Id == id);
        }
    }
}
