const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const pageTitles = {
    dashboard: "Dashboard",
    sessions: "My Sessions",
    tutors: "Find Tutors",
    reviews: "Reviews",
    profile: "Profile"
};

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
        window.location.href = "index.html";
    }
}

loadLearnerInfo();