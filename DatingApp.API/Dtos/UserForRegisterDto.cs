using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {        
        [Required]
        [StringLength(50, 
        MinimumLength = 2,
        ErrorMessage = "You must specify user name between 2 and 50 characters.")]
        public string UserName { get; set; }

        [Required]
        [StringLength(20, 
        MinimumLength = 4,
        ErrorMessage = "You must specify password between 4 and 20 characters.")]
        public string Password { get; set; }
        
    }
}