using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using new_b.Models;
using System;
using System.Collections.Generic;

namespace new_b.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallticketController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public HallticketController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("generate")]
        public IActionResult GenerateHallticket()
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();

                    // Fetch startdate from walkinlist
                    string startDateQuery = "SELECT startdate FROM walkinlist WHERE id = (SELECT MAX(id) FROM walkinlist)";
                    DateTime startDate;
                    using (MySqlCommand startDateCommand = new MySqlCommand(startDateQuery, connection))
                    {
                        object startDateResult = startDateCommand.ExecuteScalar();
                        startDate = Convert.ToDateTime(startDateResult);
                    }

                    // Fetch timeslot from detailsform
                    string timeslotQuery = "SELECT timeslot FROM detailsform WHERE id = (SELECT MAX(id) FROM detailsform)";
                    string timeslot;
                    using (MySqlCommand timeslotCommand = new MySqlCommand(timeslotQuery, connection))
                    {
#nullable disable
                        object timeslotResult = timeslotCommand.ExecuteScalar();
                        timeslot = timeslotResult.ToString();
                    }

                    // Create the hall ticket model
                    Hallticket hallticket = new Hallticket
                    {
                        Title = "Walk-in Interview Hall Ticket",
                        Date = startDate.ToString("yyyy-MM-dd"),
                        Time = timeslot,
                        VenueName = "Zeus Systems Pvt. Ltd.",
                        VenueAddress = "1402, 14th Floor, Tower B,Peninsula Business Park. Ganpatrao Kadam Marg",
                        VenueCity = "Lower Parel (W)",
                        VenuePostalCode = "Mumbai - 400 013",
                        VenuePhone = "Phone: +91-22-66600000",
                        ThingsToRemember = new List<string>
                        {
                            "- Please report 30 MINUTES prior to your reporting time.",
                            "- Download your Hall Ticket from below and carry it with you during your Walk-In."
                        }
                    };

                    return Ok(hallticket);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
