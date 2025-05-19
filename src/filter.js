// ფილტრი

document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = [
    { id: "industryDropdown", toggleClass: "industry-toggle" },
    { id: "technologyDropdown", toggleClass: "technology-toggle" },
    { id: "regionDropdown", toggleClass: "region-toggle" },
    { id: "businessDropdown", toggleClass: "business-toggle" },
    { id: "financingDropdown", toggleClass: "financing-toggle" },
    { id: "dataDropdown", toggleClass: "data-toggle" },
    { id: "filterBox", toggleClass: "filter-title" },
  ];

  function closeAllDropdowns(exceptId, allowCloseFilterBox = true) {
    dropdowns.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el && id !== exceptId) {
        if (id === "filterBox" && !allowCloseFilterBox) {
          return;
        }
        el.classList.remove("active");
      }
    });
  }

  dropdowns.forEach(({ id, toggleClass }) => {
    const dropdown = document.getElementById(id);
    const toggleBtn = document.querySelector(`.${toggleClass}`);

    if (dropdown && toggleBtn) {
      toggleBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isActive = dropdown.classList.contains("active");
        closeAllDropdowns(id);
        dropdown.classList.toggle("active", !isActive);
      });
    }
  });

  // ეკრანზე კლიკით დახურვა

  document.addEventListener("click", function (event) {
    const isClickInsideDropdown = dropdowns.some(({ id, toggleClass }) => {
      const dropdown = document.getElementById(id);
      const toggleBtn = document.querySelector(`.${toggleClass}`);
      return (
        dropdown.contains(event.target) || toggleBtn.contains(event.target)
      );
    });

    if (!isClickInsideDropdown) {
      closeAllDropdowns();
    }
  });

  // Text input tag

  const inputFilters = document.querySelectorAll(".input-filter");
  const tagContainer = document.getElementById("selectedTags");

  inputFilters.forEach((input) => {
    input.addEventListener("change", function () {
      const value = this.value;

      const targetId = this.dataset.target;
      if (targetId) {
        const group = document.getElementById(targetId);
        if (group) {
          const checkboxes = group.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach((cb) => (cb.checked = this.checked));
        }
      }

      if (this.checked) {
        if (!document.querySelector(`.tag[data-value="${value}"]`)) {
          const tag = document.createElement("span");
          tag.className = "tag";
          tag.dataset.value = value;
          tag.textContent = value + " ";

          const removeBtn = document.createElement("button");
          removeBtn.type = "button";
          removeBtn.textContent = "X";

          removeBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            removeTag(value);
          });

          tag.appendChild(removeBtn);

          tagContainer.appendChild(tag);
        }
      } else {
        removeTag(value);
      }
    });
  });

  const input = document.getElementById("searchFilterInput");

  if (input && tagContainer) {
    input.addEventListener("input", function () {
      const value = input.value.trim();
      const oldTag = document.querySelector(".tag.live");
      if (oldTag) oldTag.remove();

      if (value !== "") {
        const tag = document.createElement("span");
        tag.className = "tag live";
        tag.dataset.value = value;
        tag.textContent = value + " ";

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.textContent = "X";
        removeBtn.setAttribute("aria-label", "Remove tag");

        removeBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          tag.remove();
          input.value = "";
          input.blur();
        });

        tag.appendChild(removeBtn);
        tagContainer.appendChild(tag);
      }
    });
  }

  //Tag წაშლა და checkbox-ის გაუქმება

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
          subcategoryGroup
            .querySelectorAll('input[type="checkbox"]')
            .forEach((subCheckbox) => {
              subCheckbox.checked = false;
            });
        }
      }
    }
  };
});

// ტელეფონის ფილტრი

document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.querySelector(".filter-button");
  const modal = document.getElementById("mobileFilterModal");

  let isModalOpen = false;

  filterBtn.addEventListener("click", () => {
    if (!isModalOpen) {
      modal.classList.remove("hide");
      modal.classList.add("show");
      isModalOpen = true;
    } else {
      modal.classList.remove("show");
      modal.classList.add("hide");
      isModalOpen = false;
    }
  });

  modal.addEventListener("animationend", (e) => {
    if (e.animationName === "modalSlideDown") {
      modal.classList.remove("hide");
    }
  });
});

// ტელეფონის თაჩი//

// const modal = document.getElementById("mobileFilterModal");
// const dragHandle = document.getElementById("dragHandle");

// let startY = 0;
// let startTop = 0;
// let isDragging = false;

// // Mouse events
// dragHandle.addEventListener("mousedown", (e) => {
//   isDragging = true;
//   startY = e.clientY;
//   startTop = modal.getBoundingClientRect().top;
//   document.body.style.userSelect = "none";
// });

// document.addEventListener("mousemove", (e) => {
//   if (!isDragging) return;

//   const deltaY = e.clientY - startY;
//   moveModal(deltaY);
// });

// document.addEventListener("mouseup", () => {
//   isDragging = false;
//   document.body.style.userSelect = "";
// });

// // Touch events
// dragHandle.addEventListener("touchstart", (e) => {
//   isDragging = true;
//   startY = e.touches[0].clientY;
//   startTop = modal.getBoundingClientRect().top;
// });

// document.addEventListener("touchmove", (e) => {
//   if (!isDragging) return;

//   const deltaY = e.touches[0].clientY - startY;
//   moveModal(deltaY);
// });

// document.addEventListener("touchend", () => {
//   isDragging = false;
// });

// // Move modal with limit
// function moveModal(deltaY) {
//   let newTop = startTop + deltaY;

//   const minTop = 0;
//   const maxTop = window.innerHeight - 100;
//   newTop = Math.max(minTop, Math.min(newTop, maxTop));

//   modal.style.top = newTop + "px";
// }
