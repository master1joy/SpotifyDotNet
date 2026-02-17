using Microsoft.AspNetCore.Mvc;
using SpotifyDotNet.Infrastructure.Data;
using SpotifyDotNet.Models;
using System.Diagnostics;

namespace SpotifyDotNet.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly SpotifyDbContext _context;

        public HomeController(ILogger<HomeController> logger,SpotifyDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult TestDatabase()
        {
            var users = _context.Users.ToList();
            return Content(users.Count > 0 ? $"Database Connected! Users Count: {users.Count}" : "Database Connected but No Users Found");
        }
    }
}
