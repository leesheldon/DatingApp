using System;
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

        [Required]        
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            CreatedOn = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}