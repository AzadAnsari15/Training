using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace new_b.Model
{
    // Models/RegistrationModel.cs
    public class RegistrationModel
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Email { get; set; } = "";
        public string PhoneNumber { get; set; } = "";
        public string ResumeUpload { get; set; } = "";
        public string PortfolioURL { get; set; } = "";
        public bool IsInstructionalDesigner { get; set; }
        public bool IsSoftwareEngineer { get; set; }
        public bool IsSoftwareQualityEngineer { get; set; }
        public string ReferralEmployee { get; set; } = "";
        public bool SendJobUpdates { get; set; }
        public string DisplayPictureUpload { get; set; } = "";
        public DateTime DateCreated { get; set; }


        public DateTime DateModified { get; set; }
    }

}