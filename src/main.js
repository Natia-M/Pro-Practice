// პირველი toggle (მენიუს ღილაკი)
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
});

// მეორე toggle (ენის მოდალი)
const languageToggle = document.getElementById("languageToggle");
const languageModal = document.getElementById("languageModal");

languageToggle.addEventListener("click", () => {
  languageModal.classList.toggle("hidden");
});

document.querySelectorAll(".language-option").forEach((option) => {
  option.addEventListener("click", () => {
    document
      .querySelectorAll(".custom-radio")
      .forEach((r) => r.classList.remove("active"));

    option.querySelector(".custom-radio").classList.add("active");

    const selectedText = option.querySelector(".language-label").textContent;
    languageToggle.querySelector("div").textContent = selectedText;

    languageModal.classList.add("hidden");
  });
});
