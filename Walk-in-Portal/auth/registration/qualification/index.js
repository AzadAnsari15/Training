function redirectBackToQualificationPage() {
  // Redirect the user to the qualification page
  window.location.href = "http://127.0.0.1:5500/auth/registration/";
}
function redirectTofinal() {
  // Redirect the user to the qualification page
  // window.location.href = "http://127.0.0.1:5500/auth/registration/final-page";
}

const fresherRadio = document.getElementById("fresherRadio");
const experiencedRadio = document.getElementById("experiencedRadio");
const fresherSection = document.getElementById("fresherSection");
const experiencedSection = document.getElementById("experiencedSection");

fresherRadio.addEventListener("change", () => {
  fresherSection.style.display = "block";
  experiencedSection.style.display = "none";
});

experiencedRadio.addEventListener("change", () => {
  fresherSection.style.display = "none";
  experiencedSection.style.display = "block";
});

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Code to extract and create the data objects
  const aggregatePercentageInput = document.getElementById(
    "aggregatePercentage"
  );
  const yearOfPassingSelect = document.getElementById("year");
  const qualificationSelect = document.getElementById("Qualification");
  const streamSelect = document.getElementById("Stream");
  const collegeSelect = document.getElementById("College");
  const otherCollegeInput = document.getElementById("college");
  const collegeLocationInput = document.getElementById("location");

  // Generate dynamic IDs for educational and professional qualifications
  const eduId = generateDynamicId();
  const profId = generateDynamicId();

  const educationalQualifications = {
    id: eduId,
    aggregatePercentage: aggregatePercentageInput.value,
    yearOfPassing: yearOfPassingSelect.value,
    qualification: qualificationSelect.value,
    stream: streamSelect.value,
    college: collegeSelect.value,
    collegeLocation: collegeLocationInput.value,
  };

  const experienceInput = document.getElementById("Experience");
  const currentCTCInput = document.getElementById("current-CTC");
  const expectedCTCInput = document.getElementById("expected-CTC");
  const isExperienced = document.getElementById("experiencedRadio").value;
  const expertiseTechnologies = document.querySelectorAll(
    "#experiencedSection .check input[type='checkbox']"
  );
  const familiarTechnologies = document.querySelectorAll(
    "#familiarSection .famili input[type='checkbox']"
  );
  const otherTechnologiesInput = document.getElementById("others");
  const noticePeriodRadioButtons = document.querySelectorAll(
    "input[name='notice']"
  );
  const noticeEndInput = document.getElementById("notice-end");
  const noticeLengthSelect = document.getElementById("length");
  const appearedForTestRadioButtons = document.querySelectorAll(
    "input[name='appearedForTest']"
  );
  const appliedRoleInput = document.getElementById("notice-period");

  const yearsOfExperience = experienceInput.value;
  const currentCTC = currentCTCInput.value;
  const expectedCTC = expectedCTCInput.value;

  // Convert selected expertise technologies to an array of objects
  const expertiseTechnologiesArray = Array.from(expertiseTechnologies)
    .filter((tech) => tech.checked)
    .map((tech) => ({
      id: generateDynamicId(),
      name: tech.parentNode.querySelector("span").textContent,
    }));

  // Convert selected familiar technologies to an array of objects
  const familiarTechnologiesArray = Array.from(familiarTechnologies)
    .filter((tech) => tech.checked)
    .map((tech) => ({
      id: generateDynamicId(),
      name: tech.parentNode.querySelector("span").textContent,
    }));

  // ...

  const otherTechnologies = otherTechnologiesInput.value;
  const noticePeriod = Array.from(noticePeriodRadioButtons).find(
    (button) => button.checked
  ).value;
  const noticeEndDate = noticeEndInput.value;
  const noticeLength = noticeLengthSelect.value;
  const appearedForTest = Array.from(appearedForTestRadioButtons).find(
    (button) => button.checked
  ).value;
  const appliedRole = appliedRoleInput.value;

  const experiencedSectionData = {
    id: profId,
    isExperienced: isExperienced === "Experienced",
    yearsOfExperience: yearsOfExperience,
    currentCTC: parseFloat(currentCTC), // Convert to float
    expectedCTC: parseFloat(expectedCTC), // Convert to float
    expertiseTechnologies: expertiseTechnologiesArray,
    familiarTechnologies: [{ id: 559216, name: "Angular JS" }],
    otherTechnologies: otherTechnologies,
    isOnNoticePeriod: noticePeriod === "Yes",
    noticePeriodEndDate: noticeEndDate,
    noticePeriodLengthMonths: parseInt(noticeLength), // Convert to integer
    appearedForZeusTest: appearedForTest === "Yes",
    appliedRole: appliedRole,
  };

  // ...
  const dataToSend = {
    educational: educationalQualifications,
    professional: experiencedSectionData,
  };
  console.log(dataToSend);

  try {
    fetch("http://localhost:5199/api/Qualification/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent successfully!");
        } else {
          console.error("Failed to send data to the API.");
          // Handle error if needed
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        // Handle error if needed
      });
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle error if needed
  }
}

function generateDynamicId() {
  return Math.floor(Math.random() * 1000000); // Generate a random ID
}

const submitButton = document.getElementById("submitButtonId");
submitButton.addEventListener("click", handleSubmit);
