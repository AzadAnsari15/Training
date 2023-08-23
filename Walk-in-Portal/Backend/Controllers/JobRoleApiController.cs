using Microsoft.AspNetCore.Mvc;
using Backend.Models;

[ApiController]
[Route("api/[controller]")]
public class JobRoleApiController : ControllerBase
{
    [HttpGet("GetAll")]
    public IActionResult GetAllJobRoles()
    {
        var mockJobRoles = MockJobRoleData.GetMockJobRoles();
        return Ok(mockJobRoles);
    }
    [HttpGet("{id}")]
    public IActionResult GetSingleJobRoles(int id)
    {
        var mockJobRoles = MockJobRoleData.GetMockJobRoles();
        return Ok(mockJobRoles.FirstOrDefault(j => j.Id == id));
    }

    // Other actions for getting specific job roles, adding, updating, and deleting.
}
