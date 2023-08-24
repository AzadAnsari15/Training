using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Service.JobRoleService
{
    public class JobRoleService : IJobRoleService
    {
        public async Task<ServiceResponse<List<JobRoleModel>>> GetAllJobRoles()
        {
            var serviceResponse = new ServiceResponse<List<JobRoleModel>>();
            try
            {
                var mockJobRoles = MockJobRoleData.GetMockJobRoles();
                serviceResponse.Data = mockJobRoles;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }


        public async Task<ServiceResponse<JobRoleModel>> GetSingleJobRoles(int id)
        {
            var serviceResponse = new ServiceResponse<JobRoleModel>();
            try
            {
                var mockJobRoles = MockJobRoleData.GetMockJobRoles();
                var jobRole = mockJobRoles.FirstOrDefault(j => j.Id == id);

                if (jobRole != null)
                {
                    serviceResponse.Data = jobRole;
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Job role not found";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

    }
}