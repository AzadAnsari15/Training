using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using new_b.Model;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegistrationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult CreateRegistration([FromBody] RegistrationModel registration)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();

                    string query = "INSERT INTO Registration (FirstName, LastName, Email, PhoneNumber, ResumeUpload, PortfolioURL, IsInstructionalDesigner, IsSoftwareEngineer, IsSoftwareQualityEngineer, ReferralEmployee, SendJobUpdates, DisplayPictureUpload, DateCreated, DateModified) " +
                                   "VALUES (@FirstName, @LastName, @Email, @PhoneNumber, @ResumeUpload, @PortfolioURL, @IsInstructionalDesigner, @IsSoftwareEngineer, @IsSoftwareQualityEngineer, @ReferralEmployee, @SendJobUpdates, @DisplayPictureUpload, @DateCreated, @DateModified)";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@FirstName", registration.FirstName);
                        command.Parameters.AddWithValue("@LastName", registration.LastName);
                        command.Parameters.AddWithValue("@Email", registration.Email);
                        command.Parameters.AddWithValue("@PhoneNumber", registration.PhoneNumber);
                        command.Parameters.AddWithValue("@ResumeUpload", registration.ResumeUpload);
                        command.Parameters.AddWithValue("@PortfolioURL", registration.PortfolioURL);
                        command.Parameters.AddWithValue("@IsInstructionalDesigner", registration.IsInstructionalDesigner);
                        command.Parameters.AddWithValue("@IsSoftwareEngineer", registration.IsSoftwareEngineer);
                        command.Parameters.AddWithValue("@IsSoftwareQualityEngineer", registration.IsSoftwareQualityEngineer);
                        command.Parameters.AddWithValue("@ReferralEmployee", registration.ReferralEmployee);
                        command.Parameters.AddWithValue("@SendJobUpdates", registration.SendJobUpdates);
                        command.Parameters.AddWithValue("@DisplayPictureUpload", registration.DisplayPictureUpload);
                        command.Parameters.AddWithValue("@DateCreated", DateTime.UtcNow);
                        command.Parameters.AddWithValue("@DateModified", DateTime.UtcNow);

                        command.ExecuteNonQuery();
                    }
                }

                return Ok(new { message = "Registration record created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetRecentRegistration()
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();

                    string query = "SELECT * FROM Registration WHERE Id = (SELECT MAX(Id) FROM Registration)";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                RegistrationModel registration = new RegistrationModel
                                {
                                    Id = Convert.ToInt32(reader["Id"]),
                                    FirstName = reader["FirstName"].ToString(),
                                    LastName = reader["LastName"].ToString(),
                                    Email = reader["Email"].ToString(),
                                    PhoneNumber = reader["PhoneNumber"].ToString(),
                                    ResumeUpload = reader["ResumeUpload"].ToString(),
                                    PortfolioURL = reader["PortfolioURL"].ToString(),
                                    IsInstructionalDesigner = Convert.ToBoolean(reader["IsInstructionalDesigner"]),
                                    IsSoftwareEngineer = Convert.ToBoolean(reader["IsSoftwareEngineer"]),
                                    IsSoftwareQualityEngineer = Convert.ToBoolean(reader["IsSoftwareQualityEngineer"]),
                                    ReferralEmployee = reader["ReferralEmployee"].ToString(),
                                    SendJobUpdates = Convert.ToBoolean(reader["SendJobUpdates"]),
                                    DisplayPictureUpload = reader["DisplayPictureUpload"].ToString(),
                                    DateCreated = Convert.ToDateTime(reader["DateCreated"]),
                                    DateModified = Convert.ToDateTime(reader["DateModified"])
                                };

                                return Ok(registration);
                            }
                            else
                            {
                                return NotFound(new { message = "No recent registration found." });
                            }
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
