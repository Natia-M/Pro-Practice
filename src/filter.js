// მოდალის გახსნა

document.addEventListener("DOMContentLoaded", function () {
  const filterIcon = document.querySelector(".filter");
  const modal = document.getElementById("filterModal");
  const closeBtn = document.querySelector(".close-filter");
  const selectedTagsContainer = document.getElementById("selectedTags");

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

  //ტეგები

  function createTag(text) {
    if (selectedTagsContainer.querySelector(`.tag[data-value="${text}"]`)) return;

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.dataset.value = text;
    tag.textContent = text + " ";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "X";

    removeBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      removeTag(text);
    });

    tag.appendChild(removeBtn);
    selectedTagsContainer.appendChild(tag);
  }

  function removeTag(text) {
    const tag = selectedTagsContainer.querySelector(`.tag[data-value="${text}"]`);
    if (tag) tag.remove();
    document.querySelectorAll(".selectable").forEach((el) => {
      if (el.textContent.trim().startsWith(text)) {
        el.classList.remove("selected");
      }
    });
  }

  document.querySelectorAll(".selectable").forEach((option) => {
    option.addEventListener("click", () => {
      option.classList.toggle("selected");

      const text = option.textContent.trim();

      if (option.classList.contains("selected")) {
        createTag(text);
      } else {
        removeTag(text);
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

  // show more / show less
  document.querySelectorAll(".filter-group").forEach((group) => {
    const showMoreBtn = group.querySelector(".show-more-btn");
    if (!showMoreBtn) return;

    const allItems = group.querySelectorAll(".selectable");
    let expanded = false;

    const updateVisibility = () => {
      allItems.forEach((item, index) => {
        if (index <= 4) {
          item.classList.remove("hidden");
        } else {
          item.classList.toggle("hidden", !expanded);
        }
      });

      const label = expanded ? "ნაკლების ჩვენება" : "მეტის ჩვენება";
      const icon = expanded ? "arrow-up.svg" : "arrow-down.svg";
      showMoreBtn.innerHTML = `
        <div>${label}</div>
        <img src="images/${icon}" alt="" />
      `;
    };

    updateVisibility();

    showMoreBtn.addEventListener("click", () => {
      expanded = !expanded;
      updateVisibility();
    });
  });
});

// გასუფთავება

const eraseBtn = document.querySelector(".erase");
const tagContainer = document.getElementById("selectedTags");
const selectableItems = document.querySelectorAll(".selectable");
const markAllButtons = document.querySelectorAll(".mark-all");

eraseBtn.addEventListener("click", () => {
  tagContainer.innerHTML = "";
  selectableItems.forEach(item => item.classList.remove("selected"));

  markAllButtons.forEach(button => {
    button.textContent = "ყველას მონიშვნა";
    button.style.color = "";
  });
});


// ჩასვლა

(function () {
  const dragHandle = document.getElementById("dragHandleMobile");
  const modal = document.getElementById("filterModal");
  const modalContent = modal.querySelector(".filter-modal-content");
  const openBtn = document.querySelector(".filter");
  const closeBtn = document.querySelector(".close-filter");

  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  let draggedDistance = 0;

  // Open modal
  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    resetTransform();
  });

  // Close modal via X button or background click
  closeBtn?.addEventListener("click", () => closeModalWithAnimation());
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalWithAnimation();
    }
  });

  function setTranslate(y) {
    modalContent.style.transform = `translateY(${y}px)`;
  }

  function resetTransform() {
    modalContent.style.transform = '';
    modalContent.classList.remove("closing", "dragging");
  }

  function closeModalWithAnimation() {
    modalContent.classList.add("closing");
    modalContent.style.transform = '';

    modalContent.addEventListener(
      "animationend",
      () => {
        modal.classList.add("hidden");
        resetTransform();
      },
      { once: true }
    );
  }

  function onStart(e) {
    const touchOrMouseY = e.touches ? e.touches[0].clientY : e.clientY;
    const bounding = dragHandle.getBoundingClientRect();
    if (touchOrMouseY > bounding.bottom) return;

    isDragging = true;
    startY = touchOrMouseY;
    modalContent.classList.add("dragging");
  }

  function onMove(e) {
    if (!isDragging) return;
    currentY = e.touches ? e.touches[0].clientY : e.clientY;
    draggedDistance = currentY - startY;

    if (draggedDistance > 0) {
      setTranslate(draggedDistance);
    }
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    modalContent.classList.remove("dragging");

    if (draggedDistance > 100) {
      closeModalWithAnimation();
    } else {
      modalContent.style.transition = "transform 0.3s ease";
      setTranslate(0);
      setTimeout(() => {
        resetTransform();
        modalContent.style.transition = "";
      }, 300);
    }
  }

  dragHandle.addEventListener("touchstart", onStart, { passive: true });
  dragHandle.addEventListener("touchmove", onMove, { passive: true });
  dragHandle.addEventListener("touchend", onEnd);

  dragHandle.addEventListener("mousedown", onStart);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onEnd);
})();

// ინფუთის წაშლა

const trashButton = document.getElementById("trashButton");
const searchInput = document.getElementById("searchFilterInput");

if (trashButton && searchInput) {
  trashButton.addEventListener("click", () => {
    searchInput.value = "";
    const liveTag = document.querySelector(".tag.live");
    if (liveTag) {
      liveTag.remove();
    }
    searchInput.focus();
  });
}

// ყველას მონიშვნა

document.querySelectorAll(".mark-all").forEach(button => {
  button.addEventListener("click", () => {
    const group = button.closest(".filter-group") || button.parentElement.parentElement;
    const tagContainer = document.getElementById("selectedTags");

    const items = [];

    let sibling = button.parentElement.nextElementSibling;
    while (sibling && !sibling.classList.contains("flex-h5-markall")) {
      if (sibling.classList.contains("selectable")) {
        items.push(sibling);
      }
      sibling = sibling.nextElementSibling;
    }

    const allSelected = items.every(item => item.classList.contains("selected"));

    if (allSelected) {
      items.forEach(item => {
        const text = item.textContent.trim();
        item.classList.remove("selected");
        const tag = tagContainer.querySelector(`.tag[data-value="${text}"]`);
        if (tag) tag.remove();
      });
      button.textContent = "ყველას მონიშვნა";
      button.style.color = "";
    } else {
      const fragment = document.createDocumentFragment();

      items.forEach(item => {
        const text = item.textContent.trim();
        if (!item.classList.contains("selected")) {
          item.classList.add("selected");

          if (!tagContainer.querySelector(`.tag[data-value="${text}"]`)) {
            const tag = document.createElement("span");
            tag.className = "tag";
            tag.dataset.value = text;
            tag.textContent = text + " ";

            const removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.textContent = "X";
            removeBtn.addEventListener("click", function (event) {
              event.stopPropagation();
              item.classList.remove("selected");
              tag.remove();
              checkIfAllDeselected(button, items);
            });

            tag.appendChild(removeBtn);
            fragment.appendChild(tag);
          }
        }
      });

      tagContainer.appendChild(fragment);
      button.textContent = "ყველას წაშლა";
      button.style.color = "#C8102E";
    }
  });
});

function checkIfAllDeselected(button, items) {
  const allDeselected = items.every(item => !item.classList.contains("selected"));
  if (allDeselected) {
    button.textContent = "ყველას მონიშვნა";
    button.style.color = "";
  }
}