// ფილტრის გასუფთვება
function resetFilters() {
  // ჩეკბოქსები
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
}

// ინდუსტიტია
const industryDropdown = document.getElementById("industryDropdown");
const industryToggleBtn = industryDropdown.querySelector(".industry-toggle");

industryToggleBtn.addEventListener("click", () => {
  industryDropdown.classList.toggle("active");
});

// რეგიონი
const regionDropdown = document.getElementById("regionDropdown");
const regionToggleBtn = regionDropdown.querySelector(".region-toggle");

regionToggleBtn.addEventListener("click", () => {
  regionDropdown.classList.toggle("active");
});

// ბიზნეს მოდელი
const businessDropdown = document.getElementById("businessDropdown");
const businessToggleBtn = businessDropdown.querySelector(".business-toggle");

businessToggleBtn.addEventListener("click", () => {
  businessDropdown.classList.toggle("active");
});

// დაფინანსების წყარო
const financingDropdown = document.getElementById("financingDropdown");
const financingToggleBtn = financingDropdown.querySelector(".financing-toggle");

financingToggleBtn.addEventListener("click", () => {
  financingDropdown.classList.toggle("active");
});

// დაარსების თარიღი
const dataDropdown = document.getElementById("dataDropdown");
const dataToggleBtn = dataDropdown.querySelector(".data-toggle");

dataToggleBtn.addEventListener("click", () => {
  dataDropdown.classList.toggle("active");
});

// კატეგორია
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.main-category-checkbox').forEach(category => {
    category.addEventListener('change', function () {
      const targetId = this.dataset.target;
      const group = document.getElementById(targetId);
      if (group) {
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = this.checked);
      }
    });
  });

  const filterTitle = document.querySelector('.filter-title');
  filterTitle.addEventListener('click', function () {
    const container = document.getElementById('filterBox');
    container.classList.toggle('active');
  });
});