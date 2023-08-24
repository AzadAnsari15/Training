using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Service.Details
{
    public class DetailsService : IDetailsService
    {
        private readonly List<DetailsModel> detailsList = new List<DetailsModel>
        {
             new DetailsModel(),
            new DetailsModel { Id = 1, TimeSlot = "Morning", IsInstructionalDesigner = true },
            new DetailsModel { Id = 2, TimeSlot = "Afternoon", IsSoftwareEngineer = true },
            // Add more details...
           
    };

        public async Task<ServiceResponse<List<DetailsModel>>> GetAllDetailsAsync()
        {
            var response = new ServiceResponse<List<DetailsModel>>
            {
                Data = detailsList,
                Success = true,
                Message = "Details retrieved successfully."
            };
            return response;
        }

        public async Task<ServiceResponse<DetailsModel>> GetDetailsByIdAsync(int id)
        {
            var details = detailsList.FirstOrDefault(d => d.Id == id);
            if (details == null)
            {
                var notFoundResponse = new ServiceResponse<DetailsModel>
                {
                    Success = false,
                    Message = "Details not found for the given ID."
                };
                return notFoundResponse;
            }

            var successResponse = new ServiceResponse<DetailsModel>
            {
                Data = details,
                Success = true,
                Message = "Details retrieved successfully."
            };
            return successResponse;
        }

        public async Task<ServiceResponse<string>> SubmitDetailsAsync(DetailsModel detailsModel)
        {
            // Assume you save the detailsModel to the _detailsList or database
            detailsList.Add(detailsModel);

            var response = new ServiceResponse<string>
            {
                Data = "Submission successful",
                Success = true,
                Message = "Details submitted successfully."
            };
            return response;
        }
    }
}
