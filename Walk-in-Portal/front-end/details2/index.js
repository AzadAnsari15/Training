function toggleRadio(label) {
  const radioInput = label.querySelector('input[type="radio"]');
  const isChecked = radioInput.checked;

  if (!isChecked) {
    radioInput.checked = true;
    label.classList.add("checked");
  } else {
    radioInput.checked = false;
    label.classList.remove("custom-radio:not(.checked)");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");
  const applyButton = document.getElementById("btn-apply");

  applyButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent form submission

    const formData = {
      timeSlot: "",
      isInstructionalDesigner: false,
      isSoftwareEngineer: false,
      isSoftwareQualityEngineer: false,
    };

    // Get the selected radio button's value
    const selectedRadio = registrationForm.querySelector(
      'input[type="radio"]:checked'
    );
    if (selectedRadio) {
      formData.timeSlot = selectedRadio.value;
    }

    // Get the selected checkboxes' values
    const instructionalDesignerCheckbox = registrationForm.querySelector(
      'input[value="Instructional Designer"]'
    );
    if (instructionalDesignerCheckbox) {
      formData.isInstructionalDesigner = instructionalDesignerCheckbox.checked;
      console.log(
        "Instructional Designer:",
        instructionalDesignerCheckbox.checked
      );
    }

    const softwareEngineerCheckbox = registrationForm.querySelector(
      'input[value="Software Engineer"]'
    );
    if (softwareEngineerCheckbox) {
      formData.isSoftwareEngineer = softwareEngineerCheckbox.checked;
      console.log("Software Engineer:", softwareEngineerCheckbox.checked);
    }

    const softwareQualityEngineerCheckbox = registrationForm.querySelector(
      'input[value="Software Quality Engineer"]'
    );
    if (softwareQualityEngineerCheckbox) {
      formData.isSoftwareQualityEngineer =
        softwareQualityEngineerCheckbox.checked;
      console.log(
        "Software Quality Engineer:",
        softwareQualityEngineerCheckbox.checked
      );
    }

    try {
      const response = await fetch("http://localhost:5199/api/DetailsForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Output success message
      } else {
        console.error("Error applying:", response.statusText);
      }
    } catch (error) {
      console.error("Error applying:", error);
    }
  });
});
