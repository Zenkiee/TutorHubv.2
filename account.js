const params = new URLSearchParams(window.location.search);
const selectedRole = params.get("role") || "learner";

const roleTitle = document.getElementById("roleTitle");
const accountMessage = document.getElementById("accountMessage");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const goToSignup = document.getElementById("goToSignup");
const loginForm = document.getElementById("loginForm");

if (roleTitle) {
    roleTitle.textContent = selectedRole === "tutor" ? "Tutor Login" : "Learner Login";
}

if (forgotPasswordLink) {
    forgotPasswordLink.href = `forgot-password.html?role=${selectedRole}`;
}

if (goToSignup) {
    goToSignup.href = `signup.html?role=${selectedRole}`;
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
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

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("loginUsername").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const users = getUsers();

        const user = users.find(user => {
            return user.email === email &&
                   user.password === password &&
                   user.role === selectedRole;
        });

        if (!user) {
            accountMessage.textContent = "Invalid email, password, or role.";
            accountMessage.style.color = "#ffb3b3";
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        accountMessage.textContent = "Login successful!";
        accountMessage.style.color = "#b6ffb6";

        setTimeout(() => {
            redirectByRole(user.role);
        }, 800);
    });
}

function redirectByRole(role) {
    if (role === "tutor") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "learner-portal.html";
    }
}