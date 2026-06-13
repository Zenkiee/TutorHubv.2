const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const pageTitles = {
    dashboard: "Dashboard",
    sessions: "My Sessions",
    tutors: "Find Tutors",
    reviews: "Reviews",
    profile: "Profile"
};

document.addEventListener("DOMContentLoaded", () => {
    const dateEl = document.getElementById("currentDate");

    if (dateEl) {
        const now = new Date();

        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        dateEl.textContent = now.toLocaleDateString("en-US", options);
    } else {
        console.error('Element with ID "currentDate" was not found.');
    }
});

function loadLearnerInfo() {
    if (!currentUser) return;

    const firstLetter = currentUser.name.charAt(0).toUpperCase();

    document.getElementById("learnerGreeting").textContent =
        `Welcome back, ${currentUser.name}!`;

    document.getElementById("learnerName").textContent = currentUser.name;
    document.getElementById("learnerInitial").textContent = firstLetter;

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");

    if (profileName) profileName.value = currentUser.name;
    if (profileEmail) profileEmail.value = currentUser.email;
}

function showPage(pageId, button) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.querySelectorAll(".menu-link").forEach(link => {
        link.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    if (button) {
        button.classList.add("active");
    }

    document.getElementById("pageTitle").textContent = pageTitles[pageId];
}

function logoutLearner() {
    if (typeof logoutUser === "function") {
        logoutUser();
    } else {
        localStorage.removeItem("currentUser");
        window.location.href = "learner-portal.html";
    }
}

loadLearnerInfo();

function togglePortalMenu() {
    document.getElementById("portalSidebar").classList.toggle("active");
    document.getElementById("sidebarOverlay").classList.toggle("active");
}

function closePortalMenu() {
    document.getElementById("portalSidebar").classList.remove("active");
    document.getElementById("sidebarOverlay").classList.remove("active");
}

function renderTutorCards() {
    const tutorGrid = document.getElementById("tutorGrid");
    const tutorSearch = document.getElementById("tutorSearch");

    if (!tutorGrid) return;

    const tutors = getTutorProfiles();

    function displayTutors(filteredTutors) {
        tutorGrid.innerHTML = "";

        filteredTutors.forEach(tutor => {
            const tutorCard = document.createElement("div");
            tutorCard.className = "tutor-card";

            const subjectTags = tutor.subjects.map(subject => {
                return `<span>${subject.name}</span>`;
            }).join("");

            tutorCard.innerHTML = `
                <img src="${tutor.avatar}" alt="${tutor.name}">

                <h3>${tutor.name}</h3>
                <p>${tutor.education || "Independent Tutor"}</p>

                <div class="subject-tags">
                    ${subjectTags}
                </div>

                <div class="tutor-actions">
                    <a href="./tutor-profile.html?id=${tutor.id}">View Profile</a>
                    <a href="./booking.html" onclick='saveSelectedTutor(${JSON.stringify(tutor)})'>Book Session</a>
                </div>
            `;

            tutorGrid.appendChild(tutorCard);
        });

        if (filteredTutors.length === 0) {
            tutorGrid.innerHTML = `
                <div class="tutor-card placeholder">
                    <div class="empty-avatar">?</div>
                    <h3>No tutors found</h3>
                    <p>Try searching another subject or tutor name.</p>
                </div>
            `;
        }
    }

    displayTutors(tutors);

    if (tutorSearch) {
        tutorSearch.addEventListener("input", function() {
            const keyword = tutorSearch.value.toLowerCase().trim();

            const filteredTutors = tutors.filter(tutor => {
                const nameMatch = tutor.name.toLowerCase().includes(keyword);
                const educationMatch = tutor.education.toLowerCase().includes(keyword);

                const subjectMatch = tutor.subjects.some(subject => {
                    return subject.name.toLowerCase().includes(keyword);
                });

                return nameMatch || educationMatch || subjectMatch;
            });

            displayTutors(filteredTutors);
        });
    }
}

document.addEventListener("DOMContentLoaded", renderTutorCards);