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
