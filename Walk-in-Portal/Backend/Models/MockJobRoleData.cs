using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public static class MockJobRoleData
    {
        public static List<JobRoleModel> GetMockJobRoles()
        {
            var jobRoles = new List<JobRoleModel>
            {
                new JobRoleModel
                {
                    Id = 1,
                    Title = "Walk In for Designer Job Role",
                    DaysToExpire = 5,
                    StartDate = DateTime.Parse("2021-07-10").Date, // Only date part
                    EndDate = DateTime.Parse("2021-07-11").Date,   // Only date part
                    Location = "Mumbai",
                    Roles = new List<RoleModel>
                    {
                        new RoleModel { Name = "Instructional Designer", Icon = "spec/Instructional.svg" }
                    }
                },
                new JobRoleModel
                {
                    Id = 2,
                    Title = "Walk In for Multiple Job Roles",

                    StartDate = DateTime.Parse("2021-07-03").Date, // Only date part
                    EndDate = DateTime.Parse("2021-07-04").Date,   // Only date part
                    Location = "Mumbai",
                    Roles = new List<RoleModel>
                    {
                        new RoleModel { Name = "Instructional Designer", Icon = "spec/Instructional.svg" },
                        new RoleModel { Name = "Software Engineer", Icon = "spec/Instructional.svg" },
                        new RoleModel { Name = "Software Quality Engineer", Icon = "spec/Software Quality Engineer.svg" }
                    },
                    InternshipOpportunity = "Internship Opportunity for MCA Students"
                },
                new JobRoleModel
                {
                    Id = 3,
                    Title = "Walk In for Design and Development Job Role",

                    StartDate = DateTime.Parse("2021-07-10").Date, // Only date part
                    EndDate = DateTime.Parse("2021-07-11").Date,   // Only date part
                    Location = "Mumbai",
                    Roles = new List<RoleModel>
                    {
                        new RoleModel { Name = "Instructional Designer", Icon = "spec/Instructional.svg" },
                        new RoleModel { Name = "Software Engineer", Icon = "spec/Instructional.svg" }
                    }
                }
            };

            return jobRoles;
        }
    }
}
