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

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("mobileFilterModal");
  const dragHandle = document.getElementById("dragHandle");

  let startY = 0;
  let currentY = 0;
  let translateY = 0;
  let isDragging = false;
  const thresholdToClose = 100;

  const setTranslateY = (value) => {
    modal.style.transform = `translateY(${value}px)`;
  };

  const resetModalPosition = () => {
    modal.style.transition = "transform 0.3s ease";
    setTranslateY(0);
    setTimeout(() => {
      modal.style.transition = "";
    }, 300);
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.classList.add("hide");
    modal.style.transition = "transform 0.3s ease";
    setTranslateY(modal.offsetHeight);
    setTimeout(() => {
      modal.style.transition = "";
      modal.style.transform = "";
    }, 300);
  };

  dragHandle.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    isDragging = true;
    startY = e.touches[0].clientY;
    modal.style.transition = "none";
  });

  dragHandle.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    translateY = currentY - startY;

    if (translateY > 0) {
      setTranslateY(translateY);
    }
  });

  dragHandle.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;

    if (translateY > thresholdToClose) {
      closeModal();
    } else {
      resetModalPosition();
    }

    startY = 0;
    currentY = 0;
    translateY = 0;
  });

  const filterBtn = document.querySelector(".filter-button");
  filterBtn?.addEventListener("click", () => {
    modal.classList.remove("hide");
    modal.classList.add("show");
    setTranslateY(0);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});

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
