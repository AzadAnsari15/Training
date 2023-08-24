using Microsoft.AspNetCore.Mvc;
using Backend.Models;

[ApiController]
[Route("api/[controller]")]
public class JobRoleApiController : ControllerBase
{
    private readonly IJobRoleService _jobRoleService;
    public JobRoleApiController(IJobRoleService jobRoleService)
    {
        _jobRoleService = jobRoleService;
    }

    [HttpGet("GetAll")]
    public async Task<IActionResult> GetAllJobRoles()
    {

        return Ok(await _jobRoleService.GetAllJobRoles());
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetSingleJobRoles(int id)
    {

        return Ok(await _jobRoleService.GetSingleJobRoles(id));
    }

    // Other actions for getting specific job roles, adding, updating, and deleting.
}
