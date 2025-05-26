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

// ტელეფონის მოდალი

(function() {
  const mobileFilterModal = document.getElementById('mobileFilterModal');
  const dragHandleMobile = document.getElementById('dragHandleMobile');

  if (!mobileFilterModal || !dragHandleMobile) return;

  let startY_filter = 0;
  let currentY_filter = 0;
  let isDragging_filter = false;
  let isOpen_filter = false;

  function getModalHeight() {
    return mobileFilterModal.getBoundingClientRect().height;
  }

  function setInitialPosition() {
    const h = getModalHeight();
    mobileFilterModal.style.transition = 'none';
    mobileFilterModal.style.bottom = `-${h}px`;
  }

  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      setInitialPosition();
    });
  });

  function openModalAction() {
    const h = getModalHeight(); 
    mobileFilterModal.style.transition = 'bottom 0.3s ease';
    mobileFilterModal.classList.add('open');
    requestAnimationFrame(() => {
      mobileFilterModal.style.bottom = '0';
    });
    isOpen_filter = true;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const h = getModalHeight();
    mobileFilterModal.style.transition = 'bottom 0.3s ease';
    mobileFilterModal.classList.remove('open');
    mobileFilterModal.style.bottom = `-${h}px`;
    isOpen_filter = false;
    document.body.style.overflow = '';
  }

  window.toggleFilterModal = function() {
    if (isOpen_filter) {
      closeModal();
    } else {
      openModalAction();
    }
  };

  function onDragStart(y) {
    isDragging_filter = true;
    startY_filter = y;
    mobileFilterModal.style.transition = 'none';
  }

  function onDragMove(y) {
    if (!isDragging_filter) return;
    currentY_filter = y;
    let deltaY = currentY_filter - startY_filter;
    const h = getModalHeight();

    if (isOpen_filter) {
      if (deltaY > 0) {
        mobileFilterModal.style.bottom = `-${deltaY}px`;
      } else {
        mobileFilterModal.style.bottom = '0';
      }
    } else {
      if (deltaY < 0) {
        let newBottom = Math.min(0, -h - deltaY);
        mobileFilterModal.style.bottom = `${newBottom}px`;
      } else {
        mobileFilterModal.style.bottom = `-${h}px`;
      }
    }
  }

  function onDragEnd() {
    if (!isDragging_filter) return;
    isDragging_filter = false;
    mobileFilterModal.style.transition = 'bottom 0.3s ease';
    const deltaY = currentY_filter - startY_filter;
    const threshold = 100;
    const h = getModalHeight();

    if (isOpen_filter) {
      if (deltaY > threshold) {
        closeModal();
      } else {
        mobileFilterModal.style.bottom = '0';
      }
    } else {
      if (deltaY < -threshold) {
        openModalAction();
      } else {
        mobileFilterModal.style.bottom = `-${h}px`;
      }
    }
  }

  dragHandleMobile.addEventListener('touchstart', (e) => {
    onDragStart(e.touches[0].clientY);
  });

  dragHandleMobile.addEventListener('touchmove', (e) => {
    onDragMove(e.touches[0].clientY);
  });

  dragHandleMobile.addEventListener('touchend', () => {
    onDragEnd();
  });

  dragHandleMobile.addEventListener('mousedown', (e) => {
    e.preventDefault();
    onDragStart(e.clientY);

    function onMouseMove(event) {
      onDragMove(event.clientY);
    }

    function onMouseUp() {
      onDragEnd();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });
})();

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
