using System.Collections.Generic;

namespace new_b.Models
{
    public class Hallticket
    {
        public string Title { get; set; } = "";
        public string Date { get; set; } = "";
        public string Time { get; set; } = "";
        public string VenueName { get; set; } = "";
        public string VenueAddress { get; set; } = "";
        public string VenueCity { get; set; } = "";
        public string VenuePostalCode { get; set; } = "";
        public string VenuePhone { get; set; } = "";
        public List<string>? ThingsToRemember { get; set; }
    }
}
