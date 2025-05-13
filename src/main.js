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
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1.2,
    },
    1400: {
      slidesPerView: 1.2,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//რუქა//
(async () => {
  const topology = await fetch(
    "https://code.highcharts.com/mapdata/countries/ge/ge-all.topo.json"
  ).then((response) => response.json());

  const data = [
    { "hc-key": "ge-ab", value: 10, name: "აფხაზეთი" },
    { "hc-key": "ge-aj", value: 11, name: "აჭარა" },
    { "hc-key": "ge-gu", value: 12, name: "გურია" },
    { "hc-key": "ge-sz", value: 13, name: "სამეგრელო-ზემო სვანეთი" },
    { "hc-key": "ge-im", value: 14, name: "იმერეთი" },
    { "hc-key": "ge-ka", value: 15, name: "კახეთი" },
    { "hc-key": "ge-mm", value: 16, name: "მცხეთა-მთიანეთი" },
    { "hc-key": "ge-rk", value: 17, name: "რაჭა-ლეჩხუმი და ქვემო სვანეთი" },
    { "hc-key": "ge-tb", value: 18, name: "თბილისი" },
    { "hc-key": "ge-kk", value: 19, name: "ქვემო ქართლი" },
    { "hc-key": "ge-sj", value: 20, name: "სამცხე-ჯავახეთი" },
    { "hc-key": "ge-sd", value: 21, name: "შიდა ქართლი" },
  ];

  const startupData = {
    "ge-tb": [
      { title: "NimbusCore", desc: "Cloud solutions for everyone" },
      { title: "ByteNest", desc: "Digital infrastructure made easy" },
      { title: "Tbilify", desc: "Marketplace for urban services" },
      { title: "Tbilify", desc: "Marketplace for urban services" },
      { title: "Tbilify", desc: "Marketplace for urban services" },
    ],
    "ge-aj": [{ title: "BatumiTech", desc: "Adjara’s innovation hub" }],
  };

  const chart = Highcharts.mapChart("container", {
    chart: {
      map: topology,
      height: document.getElementById("container").offsetHeight,
      width: document.getElementById("container").offsetWidth,
    },

    title: {
      text: "საქართველო – სტარტაპების რუკა",
    },

    subtitle: {
      text: "აირჩიე რეგიონი, რომ ნახო სტარტაპები",
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
        name: "რეგიონები",
        joinBy: ["hc-key", "hc-key"],
        states: {
          hover: {
            color: "#FF69B4",
          },
          select: {
            color: "#FF69B4",
          },
        },
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          formatter: function () {
            const name = this.point.name;
            if (name === "რაჭა-ლეჩხუმი და ქვემო სვანეთი") {
              return "რაჭა-ლეჩხუმი<br>და ქვემო სვანეთი";
            }
            if (name === "სამეგრელო-ზემო სვანეთი") {
              return "სამეგრელო-<br>ზემო სვანეთი";
            }
            return name;
          },
          style: {
            fontSize: "9px",
            textAlign: "center",
          },
        },
        point: {
          events: {
            click: function () {
              showStartups(this["hc-key"]);
            },
          },
        },
      },
    ],
  });

  const tbilisiPoint = chart.series[0].data.find(
    (p) => p["hc-key"] === "ge-tb"
  );
  if (tbilisiPoint) {
    tbilisiPoint.select(true, false);
    showStartups("ge-tb");
  }

  function showStartups(regionKey) {
    const startups = startupData[regionKey];
    const regionName =
      data.find((d) => d["hc-key"] === regionKey)?.name || "რეგიონი";

    const box = document.getElementById("startup-box");

    if (startups && startups.length > 0) {
      const cards = startups
        .map(
          (s) => `
      <div class="startup-card">
        <img src="./images/airbnb2.png" alt="logo">
        <div class="startup-info">
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
        </div>
      </div>
    `
        )
        .join("");

      box.innerHTML = cards;
    } else {
      box.innerHTML = `<h3>${regionName}</h3><p>სტარტაპები ვერ მოიძებნა.</p>`; // ✅ სათაური მხოლოდ როცა ცარიელია
    }
  }
})();
