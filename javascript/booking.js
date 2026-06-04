const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

const today = new Date(2026, 4, 30);

let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let selectedDate = null;

const availableDates = {
    "2026-05": [30],
    "2026-06": [1, 11, 19, 26],
    "2026-07": [6, 12, 20, 27]
};

function renderCalendar() {
    const calendarMonth = document.getElementById("calendarMonth");
    const calendarDays = document.getElementById("calendarDays");

    calendarMonth.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    calendarDays.innerHTML = "";

    const monthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
    const availableDays = availableDates[monthKey] || [];

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const startDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = startDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        calendarDays.innerHTML += `<span class="muted">${day}</span>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(currentYear, currentMonth, day);
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const isPastDate = currentDate < todayDate;
        const isAvailable = availableDays.includes(day) && !isPastDate;

        const dateValue = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        let className = "";

        if (isPastDate) {
            className += " unavailable";
        }

        if (isAvailable) {
            className += " available";
        }

        if (selectedDate === dateValue) {
            className = "selected";
        }

        if (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        ) {
            className += " today";
        }

        const clickEvent = isAvailable
            ? `onclick="selectDate('${dateValue}')"`
            : "";

        calendarDays.innerHTML += `<span class="${className.trim()}" ${clickEvent}>${day}</span>`;
    }

    const totalCells = calendarDays.children.length;
    const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;

    for (let day = 1; day <= remainingCells; day++) {
        calendarDays.innerHTML += `<span class="muted">${day}</span>`;
    }
}

function changeMonth(direction) {
    currentMonth += direction;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar();
}

function selectDate(date) {
    selectedDate = date;
    document.getElementById("summaryDate").textContent = formatDate(date);
    renderCalendar();
}

function showStep(stepId) {
    document.querySelectorAll(".booking-step").forEach(step => {
        step.classList.remove("active");
    });

    document.getElementById(stepId).classList.add("active");
}

function goToDetails() {
    if (!selectedDate) {
        alert("Please select an available date first.");
        return;
    }

    showStep("detailsStep");
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

document.getElementById("detailsForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const time = document.getElementById("time").value;

    const fullName = `${firstName} ${lastName}`;

    document.getElementById("paymentName").value = fullName;
    document.getElementById("paymentEmail").value = email;

    document.getElementById("summaryName").textContent = fullName;
    document.getElementById("summarySubject").textContent = subject;
    document.getElementById("summaryTime").textContent = time;

    document.getElementById("finalName").textContent = fullName;
    document.getElementById("finalDate").textContent = formatDate(selectedDate);
    document.getElementById("finalSubject").textContent = subject;
    document.getElementById("finalTime").textContent = time;

    showStep("paymentStep");
});

document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    showStep("confirmStep");
});

document.querySelectorAll(".payment").forEach(button => {
    button.addEventListener("click", function() {
        document.querySelectorAll(".payment").forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");
        document.getElementById("summaryPayment").textContent = this.textContent;
    });
});

renderCalendar();