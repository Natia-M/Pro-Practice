document.addEventListener("DOMContentLoaded", () => {
  // სლაიდერის კოდი
  function sliderFn() {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    let slideInterval;

    function renderSlides() {
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add("show-slide");
        } else {
          slide.classList.remove("show-slide");
        }
      });
    }

    function goToNextSlide() {
      if (currentSlide === slides.length - 1) {
        currentSlide = 0;
      } else {
        currentSlide++;
      }
      renderSlides();
    }

    function startSlideShow() {
      slideInterval = setInterval(goToNextSlide, 3000);
    }

    function stopSlideShow() {
      clearInterval(slideInterval);
    }

    const wrapper = document.querySelector(".slider-wrapper");
    if (wrapper) {
      wrapper.addEventListener("mouseover", stopSlideShow);
      wrapper.addEventListener("mouseout", startSlideShow);
    }

    renderSlides();
    startSlideShow();
  }

  sliderFn();
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
