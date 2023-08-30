using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace new_b.Model
{
    public class ProfessionalQualification
    {
        public int Id { get; set; }
        public bool IsExperienced { get; set; }
        public int YearsOfExperience { get; set; }
        public decimal CurrentCTC { get; set; }
        public decimal ExpectedCTC { get; set; }
        public List<Technology>? ExpertiseTechnologies { get; set; }
        public List<Technology>? FamiliarTechnologies { get; set; }
        public bool IsOnNoticePeriod { get; set; }
        public DateTime NoticePeriodEndDate { get; set; }
        public int NoticePeriodLengthMonths { get; set; }
        public bool AppearedForZeusTest { get; set; }
        public string? AppliedRole { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
