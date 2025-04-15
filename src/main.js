//სლაიდერის კოდი//
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

  document
    .querySelector(".slider-wrapper")
    .addEventListener("mouseover", stopSlideShow);

  document
    .querySelector(".slider-wrapper")
    .addEventListener("mouseout", startSlideShow);

  renderSlides();
  startSlideShow();
}

sliderFn();
