// // ინდუსტიტია
// const industryDropdown = document.getElementById("industryDropdown");
// const industryToggleBtn = industryDropdown.querySelector(".industry-toggle");

// industryToggleBtn.addEventListener("click", () => {
//   industryDropdown.classList.toggle("active");
// });

// // ტექნოლოგია
// const technologyDropdown = document.getElementById("technologyDropdown");
// const technologyToggleBtn = technologyDropdown.querySelector(".technology-toggle");

// technologyToggleBtn.addEventListener("click", () => {
//   technologyDropdown.classList.toggle("active");
// });

// // რეგიონი
// const regionDropdown = document.getElementById("regionDropdown");
// const regionToggleBtn = regionDropdown.querySelector(".region-toggle");

// regionToggleBtn.addEventListener("click", () => {
//   regionDropdown.classList.toggle("active");
// });

// // ბიზნეს მოდელი
// const businessDropdown = document.getElementById("businessDropdown");
// const businessToggleBtn = businessDropdown.querySelector(".business-toggle");

// businessToggleBtn.addEventListener("click", () => {
//   businessDropdown.classList.toggle("active");
// });

// // დაფინანსების წყარო
// const financingDropdown = document.getElementById("financingDropdown");
// const financingToggleBtn = financingDropdown.querySelector(".financing-toggle");

// financingToggleBtn.addEventListener("click", () => {
//   financingDropdown.classList.toggle("active");
// });

// // დაარსების თარიღი
// const dataDropdown = document.getElementById("dataDropdown");
// const dataToggleBtn = dataDropdown.querySelector(".data-toggle");

// dataToggleBtn.addEventListener("click", () => {
//   dataDropdown.classList.toggle("active");
// });

// // კატეგორია
// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelectorAll('.input-filter').forEach(category => {
//     category.addEventListener('change', function () {
//       const targetId = this.dataset.target;
//       const group = document.getElementById(targetId);
//       if (group) {
//         const checkboxes = group.querySelectorAll('input[type="checkbox"]');
//         checkboxes.forEach(cb => cb.checked = this.checked);
//       }
//     });
//   });

//   const filterTitle = document.querySelector('.filter-title');
//   filterTitle.addEventListener('click', function () {
//     const container = document.getElementById('filterBox');
//     container.classList.toggle('active');
//   });
// });

// ღილაკი ტელეფონზე

document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.querySelector('.filter-button');
  const mobileMenu = document.querySelector('.div-mobile-all-filter');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Dropdown ივენთები
  const dropdowns = [
    { id: "industryDropdown", toggleClass: "industry-toggle" },
    { id: "technologyDropdown", toggleClass: "technology-toggle" },
    { id: "regionDropdown", toggleClass: "region-toggle" },
    { id: "businessDropdown", toggleClass: "business-toggle" },
    { id: "financingDropdown", toggleClass: "financing-toggle" },
    { id: "dataDropdown", toggleClass: "data-toggle" },
    { id: "filterBox", toggleClass: "filter-title" },
  ];

  function closeAllDropdowns(exceptId) {
    dropdowns.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el && id !== exceptId) {
        el.classList.remove("active");
      }
    });
  }

  dropdowns.forEach(({ id, toggleClass }) => {
    const dropdown = document.getElementById(id);
    const toggleBtn = document.querySelector(`.${toggleClass}`);

    if (dropdown && toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const isActive = dropdown.classList.contains("active");
        closeAllDropdowns(id);
        dropdown.classList.toggle("active", !isActive);
      });
    }
  });

  document.addEventListener("click", function (event) {
    const isClickInsideDropdown = dropdowns.some(({ id, toggleClass }) => {
      const dropdown = document.getElementById(id);
      const toggleBtn = document.querySelector(`.${toggleClass}`);
      return (
        dropdown && toggleBtn &&
        (dropdown.contains(event.target) || toggleBtn.contains(event.target))
      );
    });

    if (!isClickInsideDropdown) {
      closeAllDropdowns();
    }
  });

  // Checkbox cascading
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

  // Tag input
  const input = document.getElementById('searchFilterInput');
  const tagContainer = document.getElementById('selectedTags');

  if (input && tagContainer) {
    input.addEventListener('input', function () {
      const value = input.value.trim();

      const oldTag = document.querySelector('.tag.live');
      if (oldTag) oldTag.remove();

      if (value !== '') {
        const tag = document.createElement('span');
        tag.className = 'tag live';
        tag.dataset.value = value;
        tag.textContent = value + ' ';

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.textContent = 'X';
        removeBtn.addEventListener('click', function () {
          tag.remove();
          input.value = '';
          input.blur();
        });

        tag.appendChild(removeBtn);
        tagContainer.appendChild(tag);
      }
    });
  }

  // Checkbox tag creation
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

  // Remove tag + uncheck
  window.removeTag = function (value) {
    const tag = document.querySelector(`.tag[data-value="${value}"]`);
    if (tag) tag.remove();

    const checkbox = document.querySelector(`.input-filter[value="${value}"]`);
    if (checkbox) {
      checkbox.checked = false;

      const target = checkbox.dataset.target;
      if (target) {
        const subcategoryGroup = document.getElementById(target);
        if (subcategoryGroup) {
          subcategoryGroup.querySelectorAll('input[type="checkbox"]').forEach(subCheckbox => {
            subCheckbox.checked = false;
          });
        }
      }
    }
  };
});
