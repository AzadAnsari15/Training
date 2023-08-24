using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Service.Details
{
    public interface IDetailsService
    {
        Task<ServiceResponse<string>> SubmitDetailsAsync(DetailsModel detailsModel);
        Task<ServiceResponse<List<DetailsModel>>> GetAllDetailsAsync();
        Task<ServiceResponse<DetailsModel>> GetDetailsByIdAsync(int id);
    }
}
