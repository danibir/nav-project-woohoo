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