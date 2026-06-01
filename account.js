const params = new URLSearchParams(window.location.search);
const selectedRole = params.get("role") || "learner";

const accountTitle = document.getElementById("accountTitle");
const accountSubtitle = document.getElementById("accountSubtitle");
const accountMessage = document.getElementById("accountMessage");

if (selectedRole === "tutor") {
    accountTitle.textContent = "Tutor Account";
    accountSubtitle.textContent = "Log in or create a tutor account to manage your portal.";
} else {
    accountTitle.textContent = "Learner Account";
    accountSubtitle.textContent = "Log in or create a learner account to book sessions.";
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function switchMode(mode, button) {
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    document.querySelectorAll(".account-form").forEach(form => {
        form.classList.remove("active");
    });

    if (mode === "login") {
        document.getElementById("loginForm").classList.add("active");
    } else {
        document.getElementById("signupForm").classList.add("active");
    }

    accountMessage.textContent = "";
}

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;

    const users = getUsers();

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        accountMessage.textContent = "This email already has an account.";
        accountMessage.style.color = "#8b0000";
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        role: selectedRole
    };

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem("currentUser", JSON.stringify(newUser));

    accountMessage.textContent = "Account created successfully!";
    accountMessage.style.color = "green";

    setTimeout(() => {
    if (newUser.role === "learner") {
        window.location.href = "contract.html";
    } else {
        redirectByRole(newUser.role);
    }
    }, 800);
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = getUsers();

    const user = users.find(user => {
        return user.email === email &&
               user.password === password &&
               user.role === selectedRole;
    });

    if (!user) {
        accountMessage.textContent = "Invalid account, password, or role.";
        accountMessage.style.color = "#8b0000";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    accountMessage.textContent = "Login successful!";
    accountMessage.style.color = "green";

    setTimeout(() => {
        redirectByRole(user.role);
    }, 800);
});

function redirectByRole(role) {
    if (role === "tutor") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "learner-portal.html";
    }
}