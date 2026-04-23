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

// Filtering in findData.ejs

// Search filter toggling for (Alle, Datasett, API'er og Begreper)
const filterTabs = document.querySelectorAll(".searchFilter li");
filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // remove active class from all
    filterTabs.forEach((t) => t.classList.remove("activeSort"));

    // add active to clicked
    tab.classList.add("activeSort");

    const filterText = tab.innerText.trim();
    console.log("Selected filter:", filterText);

    // TODO: call your filtering function here
    filterResults();
  });
});

// Check filtering
const checkboxes = document.querySelectorAll(".realCheckbox");
checkboxes.forEach((box) => {
  box.addEventListener("change", () => {
    const parentOption = box.closest(".filterOption");

    // If this is a parent (has children after it)
    if (!parentOption.classList.contains("secondaryOption")) {
      let next = parentOption.nextElementSibling;

      while (next && next.classList.contains("secondaryOption")) {
        const childCheckbox = next.querySelector(".realCheckbox");
        childCheckbox.checked = box.checked;
        next = next.nextElementSibling;
      }
    }

    filterResults();
  });
});
checkboxes.forEach((box) => {
  box.addEventListener("change", () => {
    const currentOption = box.closest(".filterOption");

    // If it's a child
    if (currentOption.classList.contains("secondaryOption")) {
      let parent = currentOption.previousElementSibling;

      // Find the parent (first non-secondary above)
      while (parent && parent.classList.contains("secondaryOption")) {
        parent = parent.previousElementSibling;
      }

      if (parent) {
        const parentCheckbox = parent.querySelector(".realCheckbox");

        // Check if any child is checked
        let next = parent.nextElementSibling;
        let anyChecked = false;

        while (next && next.classList.contains("secondaryOption")) {
          if (next.querySelector(".realCheckbox").checked) {
            anyChecked = true;
          }
          next = next.nextElementSibling;
        }

        parentCheckbox.checked = anyChecked;
      }
    }

    filterResults();
  });
});

// Reset Button
const resetBtn = document.querySelector(".activeFilters button");

resetBtn.addEventListener("click", () => {
  // 1. Uncheck all checkboxes
  const checkboxes = document.querySelectorAll(".realCheckbox");
  checkboxes.forEach((box) => (box.checked = false));

  // 2. (Optional) Collapse all expanded children
  const secondaryOptions = document.querySelectorAll(".secondaryOption");
  secondaryOptions.forEach((opt) => opt.classList.add("hidden"));

  // 3. Reset parent checkboxes (important if you used parent-child logic)
  checkboxes.forEach((box) => {
    box.indeterminate = false; // if you used partial check
  });

  // 4. Show all results again
  const results = document.querySelectorAll(".dataPreview");
  results.forEach((item) => (item.style.display = "block"));

  // 5. Run filter again (clean state)
  filterResults();

  console.log("Filters reset");
});

// Arrows
const arrows = document.querySelectorAll(".downArrow");
arrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    let parent = arrow.closest(".filterOption");
    let next = parent.nextElementSibling;

    while (next && next.classList.contains("secondaryOption")) {
      next.classList.toggle("hidden");
      next = next.nextElementSibling;
    }
  });
});

// Filter Result
function filterResults() {
  const selectedFilters = Array.from(document.querySelectorAll(".realCheckbox"))
    .filter((box) => box.checked)
    .map((box) => box.closest("label").innerText.trim());

  const results = document.querySelectorAll(".dataPreview");

  results.forEach((item) => {
    const temaString = item.dataset.tema || "";

    // convert string → array
    const tags = temaString.split(",").map((t) => t.trim());

    // show all if no filters selected
    if (selectedFilters.length === 0) {
      item.style.display = "block";
      return;
    }

    const matches = selectedFilters.some((filter) => tags.includes(filter));

    item.style.display = matches ? "block" : "none";
    console.log("Tags:", tags);
    console.log("Selected:", selectedFilters);
  });
}
