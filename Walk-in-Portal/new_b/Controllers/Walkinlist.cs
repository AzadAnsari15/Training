using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using new_b.Model;
using System;
using System.Collections.Generic;

namespace new_b.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalkinlistController : ControllerBase
    {
        private string connectionString = "Server=localhost;Port=3306;Database=Portal ;User Id=root;Password=root";

        // POST: api/walkinlist
        [HttpPost]
        public ActionResult<WalkinlistModel> PostWalkinlist(WalkinlistModel walkinlist)
        {
            InsertWalkinlist(walkinlist);
            return CreatedAtAction(nameof(GetWalkinlist), new { id = walkinlist.Id }, walkinlist);
        }

        // GET: api/walkinlist
        [HttpGet]
        public ActionResult<IEnumerable<WalkinlistModel>> GetWalkinlist()
        {
            var walkinlistData = GetWalkinlistData();
            return Ok(walkinlistData);
        }

        private void InsertWalkinlist(WalkinlistModel walkinlist)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                var query = "INSERT INTO Walkinlist (Title, DaysToExpire, StartDate, EndDate, Location, InternshipOpportunity, DateCreated, DateModified) " +
                            "VALUES (@Title, @DaysToExpire, @StartDate, @EndDate, @Location, @InternshipOpportunity, @DateCreated, @DateModified);";

                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Title", walkinlist.Title);
                    command.Parameters.AddWithValue("@DaysToExpire", walkinlist.DaysToExpire);
                    command.Parameters.AddWithValue("@StartDate", walkinlist.StartDate);
                    command.Parameters.AddWithValue("@EndDate", walkinlist.EndDate);
                    command.Parameters.AddWithValue("@Location", walkinlist.Location);
                    command.Parameters.AddWithValue("@InternshipOpportunity", walkinlist.InternshipOpportunity);
                    command.Parameters.AddWithValue("@DateCreated", walkinlist.DateCreated);
                    command.Parameters.AddWithValue("@DateModified", walkinlist.DateModified);

                    command.ExecuteNonQuery();

                    // Get the last inserted ID
                    walkinlist.Id = (int)command.LastInsertedId;
                }

                // Insert roles for the walkinlist
                foreach (var role in walkinlist.Roles)
                {
                    InsertRole(connection, walkinlist.Id, role);
                }
            }
        }

        private void InsertRole(MySqlConnection connection, int walkinlistId, RoleModel role)
        {
            var roleQuery = "INSERT INTO Role (WalkinlistId, Name, Icon) " +
                            "VALUES (@WalkinlistId, @Name, @Icon);";

            using (var command = new MySqlCommand(roleQuery, connection))
            {
                command.Parameters.AddWithValue("@WalkinlistId", walkinlistId);
                command.Parameters.AddWithValue("@Name", role.Name);
                command.Parameters.AddWithValue("@Icon", role.Icon);

                command.ExecuteNonQuery();
            }
        }
        private List<WalkinlistModel> GetWalkinlistData()
        {
            var walkinlistData = new List<WalkinlistModel>();

            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                var query = "SELECT * FROM Walkinlist";

                using (var command = new MySqlCommand(query, connection))
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var walkinlist = new WalkinlistModel
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Title = reader["Title"].ToString(),
                            DaysToExpire = Convert.ToInt32(reader["DaysToExpire"]),
                            StartDate = Convert.ToDateTime(reader["StartDate"]),
                            EndDate = Convert.ToDateTime(reader["EndDate"]),
                            Location = reader["Location"].ToString(),
                            InternshipOpportunity = reader["InternshipOpportunity"].ToString(),
                            DateCreated = Convert.ToDateTime(reader["DateCreated"]),
                            DateModified = Convert.ToDateTime(reader["DateModified"])
                        };

                        walkinlistData.Add(walkinlist);
                    }

                    // Close the outer reader before proceeding with inner queries
                    reader.Close();

                    foreach (var walkinlist in walkinlistData)
                    {
                        walkinlist.Roles = GetRolesForWalkinlist(connection, walkinlist.Id);
                    }
                }
            }

            return walkinlistData;
        }


        private List<RoleModel> GetRolesForWalkinlist(MySqlConnection connection, int walkinlistId)
        {
            var roles = new List<RoleModel>();

            var query = "SELECT * FROM Role WHERE WalkinlistId = @WalkinlistId";

            using (var command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@WalkinlistId", walkinlistId);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var role = new RoleModel
                        {
                            Name = reader["Name"].ToString(),
                            Icon = reader["Icon"].ToString()
                        };

                        roles.Add(role);
                    }
                }
            }

            return roles;
        }
        [HttpGet("{id}")]
        public ActionResult<WalkinlistModel> GetWalkinlistById(int id)
        {
            var walkinlistData = GetWalkinlistDataById(id);

            if (walkinlistData == null)
            {
                return NotFound();
            }

            return Ok(walkinlistData);
        }

        private WalkinlistModel GetWalkinlistDataById(int id)
        {
            WalkinlistModel walkinlistData = null;

            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                var query = "SELECT * FROM Walkinlist WHERE Id = @Id";

                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", id);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            walkinlistData = new WalkinlistModel
                            {
                                Id = Convert.ToInt32(reader["Id"]),
                                Title = reader["Title"].ToString(),
                                DaysToExpire = Convert.ToInt32(reader["DaysToExpire"]),
                                StartDate = Convert.ToDateTime(reader["StartDate"]),
                                EndDate = Convert.ToDateTime(reader["EndDate"]),
                                Location = reader["Location"].ToString(),
                                InternshipOpportunity = reader["InternshipOpportunity"].ToString(),
                                DateCreated = Convert.ToDateTime(reader["DateCreated"]),
                                DateModified = Convert.ToDateTime(reader["DateModified"])
                            };

                            // Close the data reader before proceeding with the inner query
                            reader.Close();

                            // Fetch associated roles
                            walkinlistData.Roles = GetRolesForWalkinlist(connection, id);
                        }
                    }
                }
            }

            return walkinlistData;
        }

    }
}
