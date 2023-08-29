using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using new_b.Model;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailsFormController : ControllerBase
    {
        private readonly string _connectionString = "Server=localhost;Port=3306;Database=Portal;User Id=root;Password=root";

        private int _nextId = 2; // Initialize with the starting value

        [HttpPost]
        public IActionResult CreateDetailsForm([FromBody] DetailsModel details)
        {
            try
            {
                details.Id = _nextId++; // Assign the current ID and increment for the next record

                using (MySqlConnection connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();

                    string query = "INSERT INTO DetailsForm (Id, TimeSlot, IsInstructionalDesigner, IsSoftwareEngineer, IsSoftwareQualityEngineer) " +
                                   "VALUES (@Id, @TimeSlot, @IsInstructionalDesigner, @IsSoftwareEngineer, @IsSoftwareQualityEngineer)";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Id", details.Id);
                        command.Parameters.AddWithValue("@TimeSlot", details.TimeSlot);
                        command.Parameters.AddWithValue("@IsInstructionalDesigner", details.IsInstructionalDesigner);
                        command.Parameters.AddWithValue("@IsSoftwareEngineer", details.IsSoftwareEngineer);
                        command.Parameters.AddWithValue("@IsSoftwareQualityEngineer", details.IsSoftwareQualityEngineer);

                        command.ExecuteNonQuery();
                    }
                }

                return Ok(new { message = "DetailsForm record created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetDetailsForms()
        {
            try
            {
                List<DetailsModel> detailsForms = new List<DetailsModel>();

                using (MySqlConnection connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();

                    string query = "SELECT * FROM DetailsForm";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                DetailsModel details = new DetailsModel
                                {
                                    Id = Convert.ToInt32(reader["Id"]),
                                    TimeSlot = reader["TimeSlot"].ToString(),
                                    IsInstructionalDesigner = Convert.ToBoolean(reader["IsInstructionalDesigner"]),
                                    IsSoftwareEngineer = Convert.ToBoolean(reader["IsSoftwareEngineer"]),
                                    IsSoftwareQualityEngineer = Convert.ToBoolean(reader["IsSoftwareQualityEngineer"])
                                };

                                detailsForms.Add(details);
                            }
                        }
                    }
                }

                return Ok(detailsForms);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
