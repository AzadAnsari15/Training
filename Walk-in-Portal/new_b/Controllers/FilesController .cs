using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Dapper;
using File = new_b.Model.File;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly string _connectionString = "Server=localhost;Port=3306;Database=portal;User Id=root;Password=root";

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length <= 0)
            {
                return BadRequest("No file uploaded.");
            }

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                using (var dbConnection = new MySqlConnection(_connectionString))
                {
                    try
                    {
                        await dbConnection.OpenAsync();

                        // Insert the file into the Files table using Dapper
                        string query = "INSERT INTO File (FileName, FileType, FileData) VALUES (@FileName, @FileType, @FileData)";
                        await dbConnection.ExecuteAsync(query, new new_b.Model.File
                        {
                            FileName = file.FileName,
                            FileType = file.ContentType,
                            FileData = memoryStream.ToArray()
                        });

                        return Ok("File uploaded successfully");
                    }
                    catch (Exception ex)
                    {
                        // Handle exceptions appropriately
                        return StatusCode(500, $"An error occurred: {ex.Message}");
                    }
                }
            }
        }

        [HttpGet("{fileId}")]
        public async Task<IActionResult> GetFile(int fileId)
        {
            using (var dbConnection = new MySqlConnection(_connectionString))
            {
                try
                {
                    await dbConnection.OpenAsync();

                    // Retrieve file from the database by ID
                    string query = "SELECT * FROM File WHERE FileID = @FileId";
                    var file = await dbConnection.QueryFirstOrDefaultAsync<File>(query, new { FileId = fileId });

                    if (file == null)
                    {
                        return NotFound("File not found.");
                    }
#nullable disable
                    return File(file.FileData, file.FileType, file.FileName);
                }
                catch (Exception ex)
                {
                    // Handle exceptions appropriately
                    return StatusCode(500, $"An error occurred: {ex.Message}");
                }
            }
        }
    }
}
