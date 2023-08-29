using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace new_b.Model
{
    public class EducationalQualification
    {
        public int Id { get; set; }
        public decimal AggregatePercentage { get; set; }
        public int YearOfPassing { get; set; }
        public string Qualification { get; set; }
        public string Stream { get; set; }
        public string College { get; set; }
        public string CollegeLocation { get; set; }

    }
}