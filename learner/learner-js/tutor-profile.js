const params = new URLSearchParams(window.location.search);
const tutorId = params.get("id") || "tutor-1";

const profilePanel = document.getElementById("profilePanel");
const calendarMonth = document.getElementById("calendarMonth");
const calendarDays = document.getElementById("calendarDays");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const bookSessionBtn = document.getElementById("bookSessionBtn");

const defaultTutor = {
    id: "tutor-1",
    name: "Vannesa L. Cainong",
    age: "24 years old",
    education: "BEED Major in General Education",
    email: "vannesacainong18@gmail.com",
    contact: "09692617638",
    location: "Vannesa Cainong",
    rate: "₱350/hr",
    avatar: "../assets/img/tutor-avatar.png",
    bio: "Hello! My name is Vannesa L. Cainong, and I am a passionate independent tutor specializing in Reading, Writing, English, Math, Filipino, and Early Learning Skills for preschool and elementary students. I graduated with a Bachelor in Elementary Education, Major in General Education, and I am dedicated to creating a positive and supportive learning environment for every student.",
    rating: 5,
    completedLessons: 23,
    availability: {
        days: "Monday - Friday",
        time: "Flexible Hours",
        availableDates: [
            "2026-01-08",
            "2026-01-09",
            "2026-01-12",
            "2026-01-23"
        ]
    },
    subjects: [
        { name: "Early Learning Skills (preschool)", price: "₱350/hr" },
        { name: "English", price: "₱350/hr" },
        { name: "Filipino", price: "₱350/hr" },
        { name: "Math", price: "₱350/hr" },
        { name: "Reading", price: "₱350/hr" },
        { name: "Writing", price: "₱350/hr" }
    ],
    reviews: [
        {
            user: "User 1",
            date: "March 21",
            rating: 5,
            comment: "Vannesa is very patient and explains lessons clearly."
        },
        {
            user: "User 3",
            date: "June 21",
            rating: 5,
            comment: "She makes learning easy and fun."
        },
        {
            user: "User 67",
            date: "May 21",
            rating: 5,
            comment: "Very approachable and supportive tutor."
        }
    ]
};

function getTutorProfiles() {
    const savedTutors = JSON.parse(localStorage.getItem("skolarTutors"));

    if (savedTutors && savedTutors.length > 0) {
        return savedTutors;
    }

    localStorage.setItem("skolarTutors", JSON.stringify([defaultTutor]));
    return [defaultTutor];
}

function getTutorById(id) {
    const tutors = getTutorProfiles();
    return tutors.find(tutor => tutor.id === id) || defaultTutor;
}

const tutor = getTutorById(tutorId);

let selectedDate = null;

const firstAvailableDate = tutor.availability.availableDates[0];
const firstDateParts = firstAvailableDate.split("-");
let currentMonth = Number(firstDateParts[1]) - 1;
let currentYear = Number(firstDateParts[0]);

renderTutorProfile();
renderCalendar();

prevMonthBtn.addEventListener("click", function() {
    currentMonth--;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    renderCalendar();
});

nextMonthBtn.addEventListener("click", function() {
    currentMonth++;

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar();
});

bookSessionBtn.addEventListener("click", function() {
    localStorage.setItem("selectedTutor", JSON.stringify(tutor));

    if (selectedDate) {
        localStorage.setItem("bookingDraft", JSON.stringify({
            tutorId: tutor.id,
            tutorName: tutor.name,
            tutorRate: tutor.rate,
            selectedDate: selectedDate
        }));
    }
});

function renderTutorProfile() {
    profilePanel.innerHTML = `
        <div class="profile-top">
            <div class="profile-main">
                <img src="${tutor.avatar}" alt="${tutor.name}" class="tutor-avatar">

                <div class="profile-details">
                    <h2>${tutor.name}</h2>
                    <p>${tutor.age}</p>
                    <p>${tutor.education}</p>
                    <p>✉ ${tutor.email}</p>
                    <p>☎ ${tutor.contact}</p>
                    <p>📍 ${tutor.location}</p>
                </div>
            </div>

            <p class="profile-rate">${tutor.rate}</p>
        </div>

        <div class="stars">${"★".repeat(tutor.rating)}${"☆".repeat(5 - tutor.rating)}</div>
        <span class="completed-lessons">${tutor.completedLessons} Completed Lessons</span>

        <div class="info-section">
            <h3>About Me</h3>
            <p>${tutor.bio}</p>
        </div>

        <div class="info-section">
            <h3>Ratings & Reviews</h3>

            <div class="rating-summary">
                <span class="rating-number">${tutor.rating}</span>
                <div>
                    <div class="stars">${"★".repeat(tutor.rating)}${"☆".repeat(5 - tutor.rating)}</div>
                    <strong>${tutor.reviews.length} reviews</strong>
                </div>
            </div>

            ${tutor.reviews.map(review => `
                <div class="review-item">
                    <div class="review-avatar">${review.user.charAt(0)}</div>

                    <div class="review-content">
                        <strong>${review.user}</strong>
                        <small>${review.date}</small>
                        <p class="review-stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
                        <p>${review.comment}</p>
                    </div>
                </div>
            `).join("")}
        </div>

        <div class="info-section">
            <h3>General Availability</h3>
            <p>🗓 ${tutor.availability.days}</p>
            <p>⏰ ${tutor.availability.time}</p>
        </div>

        <div class="info-section">
            <h3>Subjects Offered</h3>

            <table class="subject-table">
                <thead>
                    <tr>
                        <th>Subjects</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    ${tutor.subjects.map(subject => `
                        <tr>
                            <td>${subject.name}</td>
                            <td>${subject.price}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function renderCalendar() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    calendarMonth.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    calendarDays.innerHTML = "";

    const availableDates = tutor.availability.availableDates;
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    let startDay = firstDay.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();

    for (let i = startDay - 1; i >= 0; i--) {
        const dayBtn = document.createElement("button");
        dayBtn.textContent = prevMonthLastDay - i;
        dayBtn.className = "muted";
        calendarDays.appendChild(dayBtn);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dateString = formatDateKey(currentYear, currentMonth, day);

        const dayBtn = document.createElement("button");
        dayBtn.textContent = day;

        if (availableDates.includes(dateString)) {
            dayBtn.classList.add("available");

            dayBtn.addEventListener("click", function() {
                selectedDate = dateString;

                const bookingDraft = {
                    tutorId: tutor.id,
                    tutorName: tutor.name,
                    tutorRate: tutor.rate,
                    selectedDate: selectedDate
                };

                localStorage.setItem("bookingDraft", JSON.stringify(bookingDraft));
                localStorage.setItem("selectedTutor", JSON.stringify(tutor));

                renderCalendar();
            });
        }

        if (selectedDate === dateString) {
            dayBtn.classList.remove("available");
            dayBtn.classList.add("selected");
        }

        calendarDays.appendChild(dayBtn);
    }

    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells;

    for (let day = 1; day <= remainingCells; day++) {
        const dayBtn = document.createElement("button");
        dayBtn.textContent = day;
        dayBtn.className = "muted";
        calendarDays.appendChild(dayBtn);
    }
}

function formatDateKey(year, month, day) {
    const monthText = String(month + 1).padStart(2, "0");
    const dayText = String(day).padStart(2, "0");

    return `${year}-${monthText}-${dayText}`;
}