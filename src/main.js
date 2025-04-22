// სლაიდერის კოდი
const swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  speed: 600,

  spaceBetween: 20,
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1,
    },
  },
});

//ძიება//
document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.querySelector(".search-icon");
  const searchText = document.querySelector(".srch > div:first-child");
  const searchInput = document.getElementById("searchInput");

  function toggleSearch() {
    if (searchInput.style.display === "none") {
      searchInput.style.display = "inline-block";
      searchInput.focus();
    } else {
      searchInput.style.display = "none";
    }
  }
  function handleSearch(event) {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query !== "") {
        console.log("ძებნა:", query);
        alert("ძებნა: " + query);
      }
    }
  }
  searchIcon.addEventListener("click", toggleSearch);
  searchText.addEventListener("click", toggleSearch);
  searchInput.addEventListener("keydown", handleSearch);
});

//ხდკ//
const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
});
