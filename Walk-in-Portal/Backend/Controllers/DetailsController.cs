using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Threading.Tasks;
using Backend.Service.Details;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DetailsController : ControllerBase
    {
        private readonly IDetailsService _detailsService;

        public DetailsController(IDetailsService detailsService)
        {
            _detailsService = detailsService;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> Submit([FromBody] DetailsModel detailsModel)
        {
            ServiceResponse<string> response = await _detailsService.SubmitDetailsAsync(detailsModel);

            if (response.Success)
            {
                return Ok(response.Data); // Return the response data if successful
            }
            else
            {
                return BadRequest(response.Message); // Return the error message if unsuccessful
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var response = await _detailsService.GetAllDetailsAsync();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _detailsService.GetDetailsByIdAsync(id);
            if (response.Success)
            {
                return Ok(response.Data);
            }
            else
            {
                return NotFound(response.Message);
            }
        }

    }
}
