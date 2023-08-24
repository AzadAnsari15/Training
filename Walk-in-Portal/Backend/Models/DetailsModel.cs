using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class DetailsModel
    {
        public int Id { get; set; }

        public string TimeSlot { get; set; } = "Default Time Slot";

        public bool IsInstructionalDesigner { get; set; } = false;
        public bool IsSoftwareEngineer { get; set; } = false;
        public bool IsSoftwareQualityEngineer { get; set; } = false;

        // public IFormFile ResumeFile { get; set; }
    }
}