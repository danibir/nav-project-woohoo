// Dropdown Menu
const menuButton = document.querySelector(".menuBttn");
const menuDropdown = document.querySelector(".menuDropdown");

if (menuButton && menuDropdown) {
  menuButton.addEventListener("click", function (event) {
    event.stopPropagation();
    menuDropdown.classList.toggle("active");
  });
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  if (menuDropdown && !menuDropdown.contains(event.target)) {
    menuDropdown.classList.remove("active");
  }
});

// Filtering in findData.ejs

// Search filter toggling for (Alle, Datasett, API'er og Begreper)
const filterTabs = document.querySelectorAll(".searchFilter li");
filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterTabs.forEach((t) => t.classList.remove("activeSort"));
    tab.classList.add("activeSort");

    const filterText = tab.innerText.trim();
    console.log("Selected filter:", filterText);

    filterResults();
  });
});

// Check filtering
const checkboxes = document.querySelectorAll(".realCheckbox");

// ⭐ NEW: Tag container + tag update function
const tagContainer = document.querySelector(".activeTagContainer");

function updateActiveTags() {
  if (!tagContainer) return;

  tagContainer.innerHTML = ""; // Clear old tags

  const checkedBoxes = Array.from(checkboxes).filter((box) => box.checked);

  checkedBoxes.forEach((box) => {
    const label = box.closest("label").innerText.trim();

    const tag = document.createElement("div");
    tag.classList.add("activeTag");
    tag.innerHTML = `
      <button class="removeTag">
        <div class="activeTagLeft">
          <h2>${label}</h2>
        </div>
        <div class="activeTagRight">
          <svg width="25" height="25" viewBox="0 0 50 50" fill="#001E30" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.70765 8.91735C6.09745 8.30716 6.09745 7.31784 6.70765 6.70765C7.31784 6.09745 8.30716 6.09745 8.91736 6.70765L25 22.7903L41.0826 6.70765C41.6928 6.09745 42.6822 6.09745 43.2924 6.70765C43.9026 7.31784 43.9026 8.30716 43.2924 8.91735L27.2097 25L43.2924 41.0826C43.9025 41.6928 43.9025 42.6822 43.2924 43.2924C42.6822 43.9026 41.6928 43.9026 41.0826 43.2924L25 27.2097L8.91736 43.2924C8.30716 43.9026 7.31784 43.9026 6.70765 43.2924C6.09745 42.6822 6.09745 41.6928 6.70765 41.0826L22.7903 25L6.70765 8.91735Z"/>
          </svg>
        </div>
      </button>
    `;

    // Remove tag handler
    tag.querySelector(".removeTag").addEventListener("click", () => {
      box.checked = false;
      
      box.dispatchEvent(new Event("change"))
    });

    tagContainer.appendChild(tag);
  });
}

// Parent → Child logic
checkboxes.forEach((box) => {
  box.addEventListener("change", () => {
    const parentOption = box.closest(".filterOption");

    if (!parentOption.classList.contains("secondaryOption")) {
      let next = parentOption.nextElementSibling;

      while (next && next.classList.contains("secondaryOption")) {
        const childCheckbox = next.querySelector(".realCheckbox");
        childCheckbox.checked = box.checked;
        next = next.nextElementSibling;
      }
    }

    updateActiveTags();
    filterResults();
  });
});

// Child → Parent logic
checkboxes.forEach((box) => {
  box.addEventListener("change", () => {
    const currentOption = box.closest(".filterOption");

    if (currentOption.classList.contains("secondaryOption")) {
      let parent = currentOption.previousElementSibling;

      while (parent && parent.classList.contains("secondaryOption")) {
        parent = parent.previousElementSibling;
      }

      if (parent) {
        const parentCheckbox = parent.querySelector(".realCheckbox");

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

    updateActiveTags();
    filterResults();
  });
});

// Reset Button
const resetBtn = document.querySelector(".activeFilters button");

resetBtn.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(".realCheckbox");
  checkboxes.forEach((box) => (box.checked = false));

  const secondaryOptions = document.querySelectorAll(".secondaryOption");
  secondaryOptions.forEach((opt) => opt.classList.add("hidden"));

  checkboxes.forEach((box) => {
    box.indeterminate = false;
  });

  const results = document.querySelectorAll(".dataPreview");
  results.forEach((item) => (item.style.display = "block"));

  updateActiveTags();
  filterResults();

  console.log("Filters reset");
});

// Arrows
const arrows = document.querySelectorAll(".downArrow");
arrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const parent = arrow.closest(".filterOption");
    let next = parent?.nextElementSibling;

    while (next && next.classList.contains("secondaryOption")) {
      next.classList.toggle("hidden");
      next = next.nextElementSibling;
    }

    arrow.classList.toggle("rotated");
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
    const tags = temaString.split(",").map((t) => t.trim());

    if (selectedFilters.length === 0) {
      item.style.display = "block";
      return;
    }

    const matches = selectedFilters.every((filter) => tags.includes(filter));

    item.style.display = matches ? "block" : "none";
  });
}

// Sorting functionality
document.getElementById("sorting").addEventListener("change", function () {
  const sortValue = this.value;
  const url = new URL(window.location);
  if (sortValue === "") {
    url.searchParams.delete("sort");
  } else {
    url.searchParams.set("sort", sortValue);
  }
  window.location.href = url.toString();
});
