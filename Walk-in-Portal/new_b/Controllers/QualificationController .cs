using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using new_b.Model;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QualificationController : ControllerBase
    {
        private readonly string _connectionString = "Server=localhost;Port=3306;Database=Portal;User Id=root;Password=root";

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegistrationRequest request)
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (MySqlTransaction transaction = connection.BeginTransaction())
                {
                    try
                    {
                        // Insert Educational Qualification
                        using (MySqlCommand eduCommand = new MySqlCommand(
                            "INSERT INTO educationalqualification (AggregatePercentage, YearOfPassing, Qualification, Stream, College, CollegeLocation) " +
                            "VALUES (@AggregatePercentage, @YearOfPassing, @Qualification, @Stream, @College, @CollegeLocation);", connection))
                        {
                            eduCommand.Parameters.AddWithValue("@AggregatePercentage", request.Educational.AggregatePercentage);
                            eduCommand.Parameters.AddWithValue("@YearOfPassing", request.Educational.YearOfPassing);
                            eduCommand.Parameters.AddWithValue("@Qualification", request.Educational.Qualification);
                            eduCommand.Parameters.AddWithValue("@Stream", request.Educational.Stream);
                            eduCommand.Parameters.AddWithValue("@College", request.Educational.College);
                            eduCommand.Parameters.AddWithValue("@CollegeLocation", request.Educational.CollegeLocation);

                            await eduCommand.ExecuteNonQueryAsync();
                            request.Educational.Id = (int)eduCommand.LastInsertedId;
                        }

                        // Insert Professional Qualification
                        using (MySqlCommand profCommand = new MySqlCommand(
                            "INSERT INTO professionalqualification (IsExperienced, YearsOfExperience, CurrentCTC, ExpectedCTC, IsOnNoticePeriod, NoticePeriodEndDate, NoticePeriodLengthMonths, AppearedForZeusTest, AppliedRole, DateCreated, DateModified) " +
                            "VALUES (@IsExperienced, @YearsOfExperience, @CurrentCTC, @ExpectedCTC, @IsOnNoticePeriod, @NoticePeriodEndDate, @NoticePeriodLengthMonths, @AppearedForZeusTest, @AppliedRole, @DateCreated, @DateModified);", connection))
                        {
                            profCommand.Parameters.AddWithValue("@IsExperienced", request.Professional.IsExperienced);
                            profCommand.Parameters.AddWithValue("@YearsOfExperience", request.Professional.YearsOfExperience);
                            profCommand.Parameters.AddWithValue("@CurrentCTC", request.Professional.CurrentCTC);
                            profCommand.Parameters.AddWithValue("@ExpectedCTC", request.Professional.ExpectedCTC);
                            profCommand.Parameters.AddWithValue("@IsOnNoticePeriod", request.Professional.IsOnNoticePeriod);
                            profCommand.Parameters.AddWithValue("@NoticePeriodEndDate", request.Professional.NoticePeriodEndDate);
                            profCommand.Parameters.AddWithValue("@NoticePeriodLengthMonths", request.Professional.NoticePeriodLengthMonths);
                            profCommand.Parameters.AddWithValue("@AppearedForZeusTest", request.Professional.AppearedForZeusTest);
                            profCommand.Parameters.AddWithValue("@AppliedRole", request.Professional.AppliedRole);
                            profCommand.Parameters.AddWithValue("@DateCreated", DateTime.UtcNow);
                            profCommand.Parameters.AddWithValue("@DateModified", DateTime.UtcNow);

                            await profCommand.ExecuteNonQueryAsync();
                            request.Professional.Id = (int)profCommand.LastInsertedId;
                        }

                        // Insert Expertise Technologies
                        foreach (Technology tech in request.Professional.ExpertiseTechnologies)
                        {
                            using (MySqlCommand techCommand = new MySqlCommand(
                                "INSERT INTO technology (Name) VALUES (@Name);", connection))
                            {
                                techCommand.Parameters.AddWithValue("@Name", tech.Name);
                                await techCommand.ExecuteNonQueryAsync();
                                tech.Id = (int)techCommand.LastInsertedId;
                            }
                        }

                        // Insert Familiar Technologies
                        foreach (Technology tech in request.Professional.FamiliarTechnologies)
                        {
                            using (MySqlCommand techCommand = new MySqlCommand(
                                "INSERT INTO Technology (Name) VALUES (@Name);", connection))
                            {
                                techCommand.Parameters.AddWithValue("@Name", tech.Name);
                                await techCommand.ExecuteNonQueryAsync();
                                tech.Id = (int)techCommand.LastInsertedId;
                            }
                        }

                        // Insert User Registration
                        using (MySqlCommand userCommand = new MySqlCommand(
                            "INSERT INTO UserRegistrationRequest (EducationalId, ProfessionalId) " +
                            "VALUES (@EducationalId, @ProfessionalId);", connection))
                        {
                            userCommand.Parameters.AddWithValue("@EducationalId", request.Educational.Id);
                            userCommand.Parameters.AddWithValue("@ProfessionalId", request.Professional.Id);
                            await userCommand.ExecuteNonQueryAsync();
                        }

                        transaction.Commit();
                        return Ok("User registration successful");
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        return StatusCode(500, "An error occurred during registration");
                    }
                }
            }
        }
        [HttpGet("users")]
        public IActionResult GetRegisteredUsers()
        {
            var users = new List<UserRegistrationRequest>();

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                using (MySqlCommand command = new MySqlCommand(
                    "SELECT * FROM EducationalQualification; " +
                    "SELECT * FROM ProfessionalQualification;", connection))
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    var educationalQualifications = new List<EducationalQualification>();
                    while (reader.Read())
                    {
                        var educational = new EducationalQualification
                        {
                            Id = reader.GetInt32("Id"),
                            AggregatePercentage = reader.GetDecimal("AggregatePercentage"),
                            YearOfPassing = reader.GetInt32("YearOfPassing"),
                            Qualification = reader.GetString("Qualification"),
                            Stream = reader.GetString("Stream"),
                            College = reader.GetString("College"),
                            CollegeLocation = reader.GetString("CollegeLocation")
                        };
                        educationalQualifications.Add(educational);
                    }

                    reader.NextResult();

                    var professionalQualifications = new List<ProfessionalQualification>();
                    while (reader.Read())
                    {
                        var professional = new ProfessionalQualification
                        {
                            Id = reader.GetInt32("Id"),
                            IsExperienced = reader.GetBoolean("IsExperienced"),
                            YearsOfExperience = reader.GetInt32("YearsOfExperience"),
                            CurrentCTC = reader.GetDecimal("CurrentCTC"),
                            ExpectedCTC = reader.GetDecimal("ExpectedCTC"),
                            IsOnNoticePeriod = reader.GetBoolean("IsOnNoticePeriod"),
                            NoticePeriodEndDate = reader.GetDateTime("NoticePeriodEndDate"),
                            NoticePeriodLengthMonths = reader.GetInt32("NoticePeriodLengthMonths"),
                            AppearedForZeusTest = reader.GetBoolean("AppearedForZeusTest"),
                            AppliedRole = reader.GetString("AppliedRole"),
                            DateCreated = reader.GetDateTime("DateCreated"),
                            DateModified = reader.GetDateTime("DateModified")
                        };
                        professionalQualifications.Add(professional);
                    }

                    reader.NextResult();

                    var technologies = new List<Technology>();
                    while (reader.Read())
                    {
                        var technology = new Technology
                        {
                            Id = reader.GetInt32("Id"),
                            Name = reader.GetString("Name")
                        };
                        technologies.Add(technology);
                    }

                    users = educationalQualifications
                        .Zip(professionalQualifications, (edu, prof) => new UserRegistrationRequest { Educational = edu, Professional = prof })
                        .ToList();

                    foreach (var user in users)
                    {
                        user.Professional.ExpertiseTechnologies = technologies;
                        user.Professional.FamiliarTechnologies = technologies;
                    }
                }
            }

            return Ok(users);
        }

    }
}
