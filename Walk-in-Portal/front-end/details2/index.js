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
      const applyButton = document.getElementById("btn-apply");

      applyButton.addEventListener("click", function () {
        window.location.href = "hall_ticket_page"; // Replace with your actual URL
      });
    });