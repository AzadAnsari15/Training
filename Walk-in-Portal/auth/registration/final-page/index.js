document.addEventListener("DOMContentLoaded", function () {
  fetchRegistrationInfo();
});

function fetchRegistrationInfo() {
  const apiUrl = "http://localhost:5199/api/Registration";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      updateRegistrationContent(data);
    })
    .catch((error) => {
      console.error("Error fetching registration information:", error);
    });
}

function updateRegistrationContent(registrationInfo) {
  // Update the relevant elements with fetched registration information
  document.querySelector(".cards .content:nth-child(1) p").textContent =
    registrationInfo.firstName;
  document.querySelector(".cards .content:nth-child(2) p").textContent =
    registrationInfo.lastName;
  document.querySelector(".cards .content:nth-child(3) p").textContent =
    registrationInfo.email;
  document.querySelector(".cards .content:nth-child(4) p").textContent =
    registrationInfo.phoneNumber;
  document.querySelector(".cards .content:nth-child(6) p").textContent =
    registrationInfo.portfolioURL;

  // Update preferred job roles
  const preferredRoles = document.querySelector(".cards .content:nth-child(7)");
  preferredRoles.innerHTML = "";
  if (registrationInfo.isInstructionalDesigner) {
    const role1 = document.createElement("p");
    role1.textContent = "Instructional Designer";
    preferredRoles.appendChild(role1);
  }
  if (registrationInfo.isSoftwareEngineer) {
    const role2 = document.createElement("p");
    role2.textContent = "Software Engineer";
    preferredRoles.appendChild(role2);
  }
  if (registrationInfo.isSoftwareQualityEngineer) {
    const role3 = document.createElement("p");
    role3.textContent = "Software Quality Engineer";
    preferredRoles.appendChild(role3);
  }

  document.querySelector(".cards .content:nth-child(8) p").textContent =
    registrationInfo.referralEmployee;

  // Update "Send job updates" checkbox
  const sendJobUpdates = document.querySelector(".cards .cheack span");
  if (registrationInfo.sendJobUpdates) {
    sendJobUpdates.textContent = "Send me job related updates via mail";
  } else {
    sendJobUpdates.textContent = "";
  }
}

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(
      "http://localhost:5199/api/Qualification/users/latest"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to populate the HTML elements with fetched data
async function populateData() {
  const data = await fetchData();

  // Educational Qualifications
  document.getElementById("educationalAggregatePercentage").textContent =
    data.educational.aggregatePercentage;
  document.getElementById("educationalYearOfPassing").textContent =
    data.educational.yearOfPassing;
  document.getElementById("educationalQualification").textContent =
    data.educational.qualification;
  document.getElementById("educationalStream").textContent =
    data.educational.stream;
  document.getElementById("educationalCollege").textContent =
    data.educational.college;
  document.getElementById("educationalOtherCollege").textContent =
    data.educational.collegeLocation;

  // Professional Qualifications
  document.getElementById("professionalApplicantType").textContent = data
    .professional.isExperienced
    ? "Experienced"
    : "Fresher";
  document.getElementById("professionalYearsOfExperience").textContent =
    data.professional.yearsOfExperience;
  document.getElementById("professionalCurrentCTC").textContent =
    data.professional.currentCTC;
  document.getElementById("professionalExpectedCTC").textContent =
    data.professional.expectedCTC;
  document.getElementById("professionalExpertiseTechnologies").textContent =
    data.professional.expertiseTechnologies || "-";
  document.getElementById("professionalOtherExpertise").textContent =
    data.professional.otherExpertise || "-";
  document.getElementById("professionalFamiliarTechnologies").textContent =
    data.professional.familiarTechnologies || "-";
  document.getElementById("professionalOtherFamiliar").textContent =
    data.professional.otherFamiliar || "-";
  document.getElementById("professionalOnNoticePeriod").textContent = data
    .professional.isOnNoticePeriod
    ? "Yes"
    : "No";
  document.getElementById("professionalNoticePeriodEndDate").textContent =
    data.professional.noticePeriodEndDate;
  document.getElementById(
    "professionalNoticePeriodLength"
  ).textContent = `${data.professional.noticePeriodLengthMonths} Months`;
  document.getElementById("professionalAppearedForZeusTest").textContent = data
    .professional.appearedForZeusTest
    ? "Yes"
    : "No";
  document.getElementById("professionalAppliedRole").textContent =
    data.professional.appliedRole;
}

// Call the populateData function when the page loads
window.addEventListener("load", populateData);
