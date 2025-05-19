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
  const modalContent = modal.querySelector(".modal-content");

  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  // შეხების დაწყება
  dragHandle.addEventListener("touchstart", (e) => {
    isDragging = true;
    startY = e.touches[0].clientY;
    modalContent.style.transition = "none";
  });

  // მოძრაობის პროცესში
  dragHandle.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY > 0) {
      modalContent.style.transform = `translateY(${deltaY}px)`;
    }
  });

  // შეხების დასრულება
  dragHandle.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;

    const deltaY = currentY - startY;
    modalContent.style.transition = "transform 0.3s ease";

    if (deltaY > 100) {
      modal.classList.remove("show");
      modal.classList.add("hide");
      modalContent.style.transform = `translateY(100%)`;
    } else {
      modalContent.style.transform = `translateY(0)`;
    }
  });

  // მოდალის ღილაკით გახსნა
  const filterBtn = document.querySelector(".filter-button");

  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      if (modal.classList.contains("hide")) {
        modal.classList.remove("hide");
        modal.classList.add("show");
        modalContent.style.transform = "translateY(0)";
      } else {
        modal.classList.remove("show");
        modal.classList.add("hide");
        modalContent.style.transform = "translateY(100%)";
      }
    });
  }

  // ანიმაციის დასრულების შემდეგ მხოლოდ კლასი დარჩეს
  modal.addEventListener("animationend", (e) => {
    if (e.animationName === "modalSlideDown") {
      modal.classList.remove("hide");
    }
  });
});