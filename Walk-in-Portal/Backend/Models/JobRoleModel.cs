using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class JobRoleModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public int DaysToExpire { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Location { get; set; } = "";
        public List<RoleModel> Roles { get; set; } =
        new List<RoleModel>(); // Default value
        public string InternshipOpportunity { get; set; } = "";
    }

    public class RoleModel
    {
        public string Name { get; set; } = "";
        public string Icon { get; set; } = "";
    }
}