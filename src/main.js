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
  slidesPerView: 1,
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1.2,
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
const questions = document.querySelectorAll(".question");

questions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const isOpen = answer.classList.contains("open");

    if (isOpen) {
      answer.classList.remove("open");
      question.classList.remove("active");
      answer.style.marginTop = "0px";
    } else {
      answer.classList.add("open");
      question.classList.add("active");
      answer.style.marginTop = "3px";
    }
  });

  question.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      question.click();
    }
  });
});
