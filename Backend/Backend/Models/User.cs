using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("User")]
    public class User
    {

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } 
    }
}
