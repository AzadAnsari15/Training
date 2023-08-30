using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace new_b.Model
{
    public class DetailsModel
    {
        public int Id { get; set; }

        public string? TimeSlot { get; set; } = "Default Time Slot";

        public bool IsInstructionalDesigner { get; set; } = false;
        public bool IsSoftwareEngineer { get; set; } = false;
        public bool IsSoftwareQualityEngineer { get; set; } = false;
    }
}