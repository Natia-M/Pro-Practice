// სლაიდერის კოდი//
const swiper = new Swiper(".mySwiper", {
  loop: true,
  centeredSlides: true,
  padding: "5rem",
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  speed: 600,
  spaceBetween: 20,
  slidesPerView: 1.2,
  breakpoints: {
    768: {
      slidesPerView: 1.2,
    },
    1024: {
      slidesPerView: 1.2,
    },
    1600: {
      slidesPerView: 2.5,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
swiper.mount();
document.addEventListener("DOMContentLoaded", function () {
  // ძებნა
  const searchIcon = document.querySelector(".search-icon");
  const searchText = document.querySelector(".search > div:first-child");
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
  searchInput.addEventListener("keydown", handleSearch);
});
//რუქა//
(async () => {
  const topology = await fetch(
    "https://code.highcharts.com/mapdata/countries/ge/ge-all.topo.json"
  ).then((response) => response.json());

  const data = [
    ["ge-ab", 10],
    ["ge-aj", 11],
    ["ge-gu", 12],
    ["ge-sz", 13],
    ["ge-im", 14],
    ["ge-ka", 15],
    ["ge-mm", 16],
    ["ge-rk", 17],
    ["ge-tb", 18],
    ["ge-kk", 19],
    ["ge-sj", 20],
    ["ge-sd", 21],
  ];

  Highcharts.mapChart("container", {
    chart: {
      map: topology,
      width: 700,
      height: 400,
    },

    mapNavigation: {
      enabled: true,
      enableMouseWheelZoom: false,
    },
    title: {
      text: "Highcharts Maps basic demo",
    },

    subtitle: {
      text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/ge/ge-all.topo.json">Georgia</a>',
    },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },

    colorAxis: {
      min: 0,
      minColor: "#FFF9C4",
      maxColor: "#FBC01D",
    },

    series: [
      {
        data: data,
        name: "Random data",
        states: {
          hover: {
            color: "#FF69B4",
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    ],
  });
})();
