using Microsoft.AspNetCore.Mvc;
using Backend.Models; 
using Backend.Data;  
using System.Linq;    

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Login request)
        {
            
            var user = _context.Users.FirstOrDefault(u =>
                u.Username.ToLower() == request.Username.ToLower() &&
                u.Password == request.Password);

            if (user != null)
            {
                return Ok(new { success = true, username = user.Username });
            }

            return Unauthorized(new { message = "Invalid Credentials" });
        }

        [HttpGet("all-users")] // This makes the URL: api/auth/all-users
        public IActionResult GetUsers()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }
    }
}