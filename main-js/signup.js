const params = new URLSearchParams(window.location.search);
const selectedRole = params.get("role") || "learner";

const roleTitle = document.getElementById("roleTitle");
const accountMessage = document.getElementById("accountMessage");
const goToLogin = document.getElementById("goToLogin");
const signupBox = document.getElementById("signupBox");

const basicSignupForm = document.getElementById("basicSignupForm");
const learnerProfileForm = document.getElementById("learnerProfileForm");
const tutorProfileForm = document.getElementById("tutorProfileForm");

const stepOneCircle = document.getElementById("stepOneCircle");
const stepTwoCircle = document.getElementById("stepTwoCircle");
const stepLabel = document.getElementById("stepLabel");

let tempAccount = null;

roleTitle.textContent = selectedRole === "tutor" ? "Tutor Sign Up" : "Learner Sign Up";

if (goToLogin) {
    goToLogin.href = `account.html?role=${selectedRole}`;
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        button.textContent = "🙈";
    } else {
        input.type = "password";
        button.textContent = "👁";
    }
}

function showProfileStep() {
    basicSignupForm.classList.remove("active");

    stepOneCircle.classList.add("done");
    stepTwoCircle.classList.add("active");
    stepLabel.textContent = "Create Profile";

    signupBox.classList.add("profile-mode");

    if (selectedRole === "tutor") {
        tutorProfileForm.classList.add("active");
        roleTitle.textContent = "Create Tutor Profile";
    } else {
        learnerProfileForm.classList.add("active");
        roleTitle.textContent = "Create Learner Profile";
    }

    accountMessage.textContent = "";
}

function goBackToSignup() {
    learnerProfileForm.classList.remove("active");
    tutorProfileForm.classList.remove("active");
    basicSignupForm.classList.add("active");

    stepOneCircle.classList.remove("done");
    stepTwoCircle.classList.remove("active");
    stepLabel.textContent = "Basic Account";

    signupBox.classList.remove("profile-mode");

    roleTitle.textContent = selectedRole === "tutor" ? "Tutor Sign Up" : "Learner Sign Up";
    accountMessage.textContent = "";
}

/* STEP 1: BASIC SIGN UP */
basicSignupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const users = getUsers();

    const existingUser = users.find(user => {
        return user.email === email && user.role === selectedRole;
    });

    if (existingUser) {
        accountMessage.textContent = "This email already has an account.";
        accountMessage.style.color = "#ffb3b3";
        return;
    }

    if (password !== confirmPassword) {
        accountMessage.textContent = "Passwords do not match.";
        accountMessage.style.color = "#ffb3b3";
        return;
    }

    tempAccount = {
        id: Date.now(),
        email: email,
        username: email,
        password: password,
        role: selectedRole,
        profileCompleted: false
    };

    showProfileStep();
});

/* STEP 2A: LEARNER PROFILE */
if (learnerProfileForm) {
    learnerProfileForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const users = getUsers();

        const learnerProfile = {
            learnerName: document.getElementById("learnerName").value.trim(),
            yearLevel: document.getElementById("yearLevel").value,
            school: document.getElementById("school").value.trim(),
            birthday: document.getElementById("birthday").value
        };

        const newUser = {
            ...tempAccount,
            name: learnerProfile.learnerName,
            profileCompleted: true,
            profile: learnerProfile
        };

        users.push(newUser);
        saveUsers(users);

        localStorage.setItem("currentUser", JSON.stringify(newUser));
        localStorage.setItem("learnerProfile", JSON.stringify(learnerProfile));

        accountMessage.textContent = "Profile created successfully!";
        accountMessage.style.color = "#b6ffb6";

        setTimeout(() => {
            window.location.href = "learner/learner-portal.html";
        }, 800);
    });
}

/* STEP 2B: TUTOR PROFILE */
tutorProfileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const users = getUsers();

    const tutorProfile = {
    tutorName: document.getElementById("tutorName").value.trim(),
    rate: document.getElementById("rate").value.trim(),
    education: document.getElementById("education").value.trim(),
    contactNumber: document.getElementById("contactNumber").value.trim(),
    bio: document.getElementById("bio").value.trim()
    };

    const newUser = {
        ...tempAccount,
        name: tutorProfile.tutorName,
        profileCompleted: true,
        profile: tutorProfile
    };

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("tutorProfile", JSON.stringify(tutorProfile));

    accountMessage.textContent = "Profile created successfully!";
    accountMessage.style.color = "#b6ffb6";

    setTimeout(() => {
        window.location.href = "tutor/tutor-dashboard.html";
    }, 800);
});