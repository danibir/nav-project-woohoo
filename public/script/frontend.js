// Dropdown Menu
document.querySelector('.menuBttn').addEventListener('click', function() {
    document.querySelector('.menuDropdown').classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.menuDropdown');
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// Filters
const checkboxes = document.querySelectorAll('.checkbox');
const arrows = document.querySelectorAll('.downArrow');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        const isChecked = checkbox.src.includes("checkbox.png");

        checkbox.src = isChecked
            ? "/img/icons/uncheckedBox.png"
            : "/img/icons/checkbox.png";

        checkbox.alt = isChecked
            ? "unchecked box"
            : "checked box";

        checkbox.style.width = isChecked
            ? "30px"
            : "20px";

        checkbox.style.margin = isChecked
            ? ""
            : "0 5px"
    });
});

arrows.forEach(arrow => {
    arrow.addEventListener('click', (e) => {
        e.preventDefault();

        arrow.classList.toggle('rotated');

        const parentOption = arrow.closest('.filterOption');
        let next = parentOption.nextElementSibling;
        while (next && next.classList.contains('secondaryOption')) {
            next.classList.toggle('hidden');
            next = next.nextElementSibling;
        }
    });
});