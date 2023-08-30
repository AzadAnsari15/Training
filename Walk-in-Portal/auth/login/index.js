document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");

  loginButton.addEventListener("click", async function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // const rememberMe = document.getElementById("rememberMe").checked;

    let currentRegistrationId = 0;

    // Create a function to generate a new registrationId
    function id() {
      currentRegistrationId++;
      return currentRegistrationId;
    }
    function generateRegistrationId() {
      currentRegistrationId++;
      return currentRegistrationId;
    }

    // When creating the loginData object
    const loginData = {
      id: id(),

      email: username,
      password: password,
    };

    try {
      const response = await fetch(
        "http://localhost:5199/api/User/login-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        // Handle successful login, e.g., redirect to dashboard
        console.log(result.message);
      } else {
        const errorData = await response.json();
        // Handle login error
        console.log(errorData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});
