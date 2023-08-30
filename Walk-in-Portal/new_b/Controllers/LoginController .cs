using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using new_b.Model;
using System;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login-register")]
        public IActionResult LoginRegister([FromBody] LoginModel login)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();

                    // Check if the email and password match in Registration table for login
                    string selectQuery = "SELECT Id FROM Registration WHERE Email = @Email AND FirstName = @Password";
                    using (MySqlCommand selectCommand = new MySqlCommand(selectQuery, connection))
                    {
                        selectCommand.Parameters.AddWithValue("@Email", login.Email);
                        selectCommand.Parameters.AddWithValue("@Password", login.Password);

                        object result = selectCommand.ExecuteScalar();

                        if (result != null)
                        {
                            int registrationId = Convert.ToInt32(result); // Extracted Id from Registration table

                            // Insert new login record into Login table
                            string insertQuery = "INSERT INTO Login (RegistrationId, Email, Password, DateCreated, DateModified) " +
                                                 "VALUES (@RegistrationId, @Email, @Password, @DateCreated, @DateModified)";
                            using (MySqlCommand insertCommand = new MySqlCommand(insertQuery, connection))
                            {
                                insertCommand.Parameters.AddWithValue("@RegistrationId", registrationId); // Use extracted Id
                                insertCommand.Parameters.AddWithValue("@Email", login.Email);
                                insertCommand.Parameters.AddWithValue("@Password", login.Password);
                                insertCommand.Parameters.AddWithValue("@DateCreated", DateTime.UtcNow);
                                insertCommand.Parameters.AddWithValue("@DateModified", DateTime.UtcNow);

                                insertCommand.ExecuteNonQuery();

                                return Ok(new { message = "Login and registration successful." });
                            }
                        }
                        else
                        {
                            // Email and password do not match
                            return Unauthorized(new { message = "Invalid credentials." });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
