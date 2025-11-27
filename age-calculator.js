
document.addEventListener("DOMContentLoaded", function() {
    const daySelect = document.getElementById('daySelect');
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const ageForm = document.getElementById('ageForm');
    const ageSpan = document.getElementById('ageSpan');

    function generateOptions(start, end, element) {
        for (let i = start; i <= end; i++) {
            let option = document.createElement('option');
            option.text = i;
            option.value = i;
            element.add(option);
        }
    }

    function calculateAge(birthday) {
        let today = new Date();
        let dob = new Date(birthday);
        let diff = today.getTime() - dob.getTime();
        let years = Math.floor(diff / 31557600000);
        let months = Math.floor((diff % 31557600000) / 2629800000);
        let days = Math.floor((diff % 2629800000) / 86400000);
        return `${years} years ${months} months ${days} days`;
    }

    generateOptions(1, 31, daySelect);
    generateOptions(1, 12, monthSelect);
    generateOptions(1900, new Date().getFullYear(), yearSelect);

    ageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let birthday = `${monthSelect.value} ${daySelect.value} ${yearSelect.value}`;
        ageSpan.textContent = calculateAge(birthday);
    });
});
