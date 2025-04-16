document.addEventListener("DOMContentLoaded", () => {
  // აქ ჩავწეროთ ყველაფერი რაც გიწერია

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

  // სტარტაპების კოდი
  const startups = [];

  for (let i = 1; i <= 100; i++) {
    startups.push({ name: `სტარტაპი ${i}` });
  }

  const itemsPerPage = 20;
  let currentPage = 1;

  function renderPage(page) {
    const container = document.getElementById("startup-container");
    if (!container) return;

    container.innerHTML = "";

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = startups.slice(start, end);

    pageItems.forEach((item) => {
      const card = document.createElement("div");
      card.className = "startup-card";
      card.textContent = item.name;
      container.appendChild(card);
    });

    renderPagination(page);
  }

  function renderPagination(activePage) {
    const totalPages = Math.ceil(startups.length / itemsPerPage);
    const pagination = document.getElementById("pagination");
    if (!pagination) return;

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === activePage) {
        btn.classList.add("active");
      }
      btn.addEventListener("click", () => {
        currentPage = i;
        renderPage(currentPage);
      });
      pagination.appendChild(btn);
    }
  }

  renderPage(currentPage);
});
