using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace new_b.Model
{

    public class UserRegistrationRequest
    {
        public EducationalQualification Educational { get; set; }
        public ProfessionalQualification Professional { get; set; }
    }

}