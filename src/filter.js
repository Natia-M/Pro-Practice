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

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("mobileFilterModal");
  const dragHandle = document.getElementById("dragHandle");
  const filterBtn = document.querySelector(".filter-button");

  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  let isModalOpen = false;

  function openModal() {
    modal.classList.remove("hide");
    modal.classList.add("show");
    modal.style.transform = "translateY(0)";
    modal.style.transition = "transform 0.3s ease";
    isModalOpen = true;
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    modal.style.transform = "translateY(100%)";
    modal.style.transition = "transform 0.3s ease";
    isModalOpen = false;
  }

  // ღილაკით გახსნა/დახურვა
  filterBtn.addEventListener("click", () => {
    if (isModalOpen) {
      closeModal();
    } else {
      openModal();
    }
  });

  // ტაჩის ქაჩვა დაწყება
  dragHandle.addEventListener("touchstart", (e) => {
    if (!isModalOpen) return;
    startY = e.touches[0].clientY;
    isDragging = true;
    modal.style.transition = "none";
  });

  // ტაჩის მოძრაობა
  dragHandle.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY > 0) {
      modal.style.transform = `translateY(${deltaY}px)`;
    }
  });

  // ქაჩვის დასრულება
  dragHandle.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    const deltaY = currentY - startY;
    modal.style.transition = "transform 0.3s ease";

    if (deltaY > 120) {
      closeModal();
    } else {
      modal.style.transform = "translateY(0)";
    }
  });
});

//ენის მოდალი//
const toggle = document.getElementById("languageToggle");
const modal = document.getElementById("languageModal");

toggle.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

document.querySelectorAll(".language-option").forEach((option) => {
  option.addEventListener("click", () => {
    document
      .querySelectorAll(".custom-radio")
      .forEach((r) => r.classList.remove("active"));
    option.querySelector(".custom-radio").classList.add("active");
    const selectedText = option.querySelector(".language-label").textContent;
    toggle.querySelector("div").textContent = selectedText;
    modal.classList.add("hidden");
  });
});

// ფილტრის გასუფთავება
function resetFilters() {
  // ჩეკბოქსები
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

  // ფილტრის dropdown ელემენტები
  const dropdownIds = [
    "industryDropdown",
    "regionDropdown",
    "businessDropdown",
    "financingDropdown",
    "dataDropdown"
  ];

  dropdownIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("active");
    }
  });

  // filterBox-ის დახურვა
  const filterBox = document.getElementById('filterBox');
  if (filterBox) {
    filterBox.classList.remove('active');
  }

  // ტეგების გასუფთავება
  const tagContainer = document.getElementById('selectedTags');
  if (tagContainer) {
    tagContainer.innerHTML = '';
  }

  // სერჩის შინაარსის გასუფთავება
  const searchInput = document.getElementById('searchFilterInput');
  if (searchInput) {
    searchInput.value = '';
    searchInput.blur();
  }
}
