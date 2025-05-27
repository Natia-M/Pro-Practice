document.addEventListener("DOMContentLoaded", function () {
  const filterIcon = document.querySelector(".filter");
  const modal = document.getElementById("filterModal");
  const closeBtn = document.querySelector(".close-filter");

  filterIcon.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Selection logic
  document.querySelectorAll(".selectable").forEach((option) => {
    option.addEventListener("click", () => {
      option.classList.toggle("selected");
    });
  });
});
