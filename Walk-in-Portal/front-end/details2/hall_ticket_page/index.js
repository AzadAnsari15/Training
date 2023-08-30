document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.addEventListener("click", downloadHallTicket);
  fetchHallTicketInfo();
});

let hallTicketInfo; // Declare the hallTicketInfo variable

function fetchHallTicketInfo() {
  const apiUrl = "http://localhost:5199/api/Hallticket/generate";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      updateHallTicketContent(data);
      hallTicketInfo = data; // Store the fetched data
    })
    .catch((error) => {
      console.error("Error fetching hall ticket information:", error);
    });
}
function updateHallTicketContent(hallTicketInfo) {
  // Update the relevant elements with fetched hall ticket information
  document.querySelector(".card-content p:nth-child(1)").textContent =
    hallTicketInfo.date;
  document.querySelector(".card-content p:nth-child(2)").textContent =
    hallTicketInfo.time;
  document.querySelector(".card-content p:nth-child(1)").textContent =
    hallTicketInfo.venueName;
  document.querySelector(".card-content p:nth-child(2)").textContent =
    hallTicketInfo.venueAddress;
  document.querySelector(".card-content p:nth-child(3)").textContent =
    hallTicketInfo.venueCity;
  document.querySelector(".card-content p:nth-child(4)").textContent =
    hallTicketInfo.venuePostalCode;
  document.querySelector(".card-content p:nth-child(5)").textContent =
    hallTicketInfo.venuePhone;

  const thingsToRememberList = document.querySelector(
    ".card-content .things-to-remember"
  );
  if (thingsToRememberList) {
    thingsToRememberList.innerHTML = ""; // Clear previous content
    hallTicketInfo.thingsToRemember.forEach((item) => {
      const listItem = document.createElement("p");
      listItem.textContent = `${item}`;
      thingsToRememberList.appendChild(listItem);
    });
  }
}
function downloadHallTicket() {
  // Check if hallTicketInfo is available before proceeding
  if (hallTicketInfo) {
    const filename = "hall_ticket.txt";
    const data = JSON.stringify(hallTicketInfo, null, 2);
    const blob = new Blob([data], { type: "application/txt" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    URL.revokeObjectURL(link.href);
  }
}
