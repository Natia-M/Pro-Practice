document.addEventListener("DOMContentLoaded", function () {
  const filterIcon = document.querySelector(".filter");
  const modal = document.getElementById("filterModal");
  const closeBtn = document.querySelector(".close-filter");

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

  document.querySelectorAll(".selectable").forEach((option) => {
    option.addEventListener("click", () => {
      option.classList.toggle("selected");
    });
  });

  const showMoreBtn = document.querySelector(".show-more-btn");
  const allItems = document.querySelectorAll(".filter-group .selectable");
  let expanded = false;

  function updateVisibility() {
    allItems.forEach((item, index) => {
      if (index <= 4) {
        item.classList.remove("hidden");
      } else {
        if (expanded) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      }
    });
    showMoreBtn.textContent = expanded ? "ნაკლების ჩვენება" : "მეტის ჩვენება";
  }

  updateVisibility();

  showMoreBtn.addEventListener("click", () => {
    expanded = !expanded;
    updateVisibility();
    showMoreBtn.innerHTML = expanded
      ? 'ნაკლების ჩვენება <img src="images/arrow-up.svg" alt="" />'
      : 'მეტის ჩვენება <img src="images/arrow-down.svg" alt="" />';
  });
});
