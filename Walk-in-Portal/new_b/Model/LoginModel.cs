using System;
using System.ComponentModel.DataAnnotations;

namespace new_b.Model
{
    public class LoginModel
    {
        [Key]
        public int Id { get; set; }
        public int RegistrationId { get; set; } // Foreign key reference

        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public DateTime DateCreated { get; set; }


        public DateTime DateModified { get; set; }
    }
}
