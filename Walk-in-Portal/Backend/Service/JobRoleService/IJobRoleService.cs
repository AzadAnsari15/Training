using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Service.JobRoleService
{
    public interface IJobRoleService
    {
        Task<ServiceResponse<List<JobRoleModel>>> GetAllJobRoles();
        Task<ServiceResponse<JobRoleModel>> GetSingleJobRoles(int id);
    }
}