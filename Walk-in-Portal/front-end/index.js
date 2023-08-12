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
