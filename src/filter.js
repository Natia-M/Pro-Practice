// ინდუსტიტია
const industryDropdown = document.getElementById("industryDropdown");
const industryToggleBtn = industryDropdown.querySelector(".industry-toggle");

industryToggleBtn.addEventListener("click", () => {
  industryDropdown.classList.toggle("active");
});

// ტექნოლოგია
const technologyDropdown = document.getElementById("technologyDropdown");
const technologyToggleBtn = technologyDropdown.querySelector(".technology-toggle");

technologyToggleBtn.addEventListener("click", () => {
  technologyDropdown.classList.toggle("active");
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
  document.querySelectorAll('.input-filter').forEach(category => {
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

// ტეგი

// სერჩის ტეგი
const input = document.getElementById('searchFilterInput');
    const tagContainer = document.getElementById('selectedTags');

    input.addEventListener('input', function () {
      const value = input.value.trim();

      const oldTag = document.querySelector('.tag.live');
      if (oldTag) oldTag.remove();

      if (value !== '') {
        const tag = document.createElement('span');
        tag.className = 'tag live';
        tag.dataset.value = value;
        tag.textContent = value;

        tagContainer.appendChild(tag);
      }
    });

// ჩეკბოქსების ტეგი და X ღილაკი
document.querySelectorAll('.input-filter').forEach(input => {
  input.addEventListener('change', function () {
    const tagContainer = document.getElementById('selectedTags');
    const value = this.value;

    if (this.checked) {
      if (!document.querySelector(`.tag[data-value="${value}"]`)) {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.dataset.value = value;
        tag.innerHTML = `${value} <button type="button" onclick="removeTag('${value}')">X</button>`;
        tagContainer.appendChild(tag);
      }
    } else {
      removeTag(value);
    }
  });
});

function removeTag(value) {
  const tag = document.querySelector(`.tag[data-value="${value}"]`);
  if (tag) tag.remove();

  const checkbox = document.querySelector(`.input-filter[value="${value}"]`);
  if (checkbox) checkbox.checked = false;
}