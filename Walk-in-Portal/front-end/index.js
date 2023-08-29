document.addEventListener("DOMContentLoaded", function () {
  const viewButton = document.querySelectorAll(".btn-view");

  viewButton.forEach((button) => {
    button.addEventListener("click", function () {
      const detailUrl = button.getAttribute("data-url");
      if (detailUrl) {
        window.location.href = detailUrl;
      }
    });
  });
});

fetch("http://localhost:5199/api/Walkinlist")
  .then((response) => response.json())
  .then((jobRolesData) => {
    // Rename the variable here
    const jobRolesContainer = document.getElementById("jobRolesContainer");

    // Loop through the jobRolesData and generate HTML for each job role
    jobRolesData.forEach((jobRole) => {
      const jobRoleDiv = document.createElement("div");
      jobRoleDiv.className = "col-12 job-role";

      const card = document.createElement("div");
      card.className = "card text-bg-light mb-4";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = jobRole.title;

      if (jobRole.daysToExpire) {
        const expire = document.createElement("p");
        expire.className = "expire";
        expire.textContent = `Expire in ${jobRole.daysToExpire} days`;
        cardBody.appendChild(expire);
      }

      const dateText = document.createElement("span");
      dateText.className = "date-text";
      dateText.textContent = "Date & Time:";

      const dateDiv = document.createElement("div");
      dateDiv.className = "date";

      const dateRange = document.createElement("time");
      dateRange.textContent = `${jobRole.startDate.substring(
        0,
        10
      )} to ${jobRole.endDate.substring(0, 10)}`;

      const divider1 = document.createElement("p");
      divider1.className = "divider";
      divider1.textContent = "|";

      const location = document.createElement("p");
      location.className = "location";
      location.innerHTML = `<i><img src="spec/location_on_black_24dp.svg" alt="Location" height="20px"></i>${jobRole.location}`;

      const borderLine = document.createElement("p");
      borderLine.className = "border-bottom";

      const jobRoleSpan = document.createElement("span");
      jobRoleSpan.className = "job-role";
      jobRoleSpan.textContent = "Job Role:";

      const rolesDiv = document.createElement("div");
      rolesDiv.className = "roles";

      jobRole.roles.forEach((role) => {
        const roleDiv = document.createElement("div");
        roleDiv.className = "Instructional";

        const roleIcon = document.createElement("img");
        roleIcon.src = role.icon;

        const roleName = document.createElement("p");
        roleName.textContent = role.name;

        roleDiv.appendChild(roleIcon);
        roleDiv.appendChild(roleName);
        rolesDiv.appendChild(roleDiv);
      });

      const buttonCenter = document.createElement("center");
      const viewButton = document.createElement("button");
      viewButton.className = "btn-view";
      viewButton.dataset.url = `details${jobRole.id}`;
      viewButton.textContent = "VIEW MORE DETAILS";

      // Append elements to build the structure
      dateDiv.appendChild(dateRange);
      dateDiv.appendChild(divider1);
      dateDiv.appendChild(location);

      // cardBody.appendChild(expire);
      cardBody.appendChild(title);
      cardBody.appendChild(dateText);
      cardBody.appendChild(dateDiv);
      cardBody.appendChild(borderLine);
      cardBody.appendChild(jobRoleSpan);
      cardBody.appendChild(rolesDiv);
      if (jobRole.internshipOpportunity) {
        const internship = document.createElement("p");
        internship.className = "internship";
        internship.textContent = jobRole.internshipOpportunity;
        cardBody.appendChild(internship);
      }
      buttonCenter.appendChild(viewButton);
      cardBody.appendChild(buttonCenter);
      card.appendChild(cardBody);
      jobRoleDiv.appendChild(card);
      jobRolesContainer.appendChild(jobRoleDiv);
      // If there's an internship opportunity, create and append the internship element
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    // Handle the error appropriately
  });
