// Dropdown Menu
document.querySelector(".menuBttn").addEventListener("click", function () {
  document.querySelector(".menuDropdown").classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".menuDropdown");
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove("active");
  }
});

// Filters
const arrows = document.querySelectorAll('.downArrow');

arrows.forEach(arrow => {
    arrow.addEventListener('click', (e) => {
        e.preventDefault();

    arrow.classList.toggle("rotated");

    const parentOption = arrow.closest(".filterOption");
    let next = parentOption.nextElementSibling;
    while (next && next.classList.contains("secondaryOption")) {
      next.classList.toggle("hidden");
      next = next.nextElementSibling;
    }
  });
});

// search filter activeSort toggling
const searchFilterLinks = document.querySelectorAll(".searchFilter a");
searchFilterLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    searchFilterLinks.forEach((l) =>
      l.parentElement.classList.remove("activeSort"),
    );
    link.parentElement.classList.add("activeSort");
  });
});
