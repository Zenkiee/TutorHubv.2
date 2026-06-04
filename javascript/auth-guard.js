function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function requireRole(requiredRole) {
    const user = getCurrentUser();

    if (!user) {
        window.location.href = `account.html?role=${requiredRole}`;
        return;
    }

    if (user.role !== requiredRole) {
        alert("You are not allowed to access this page.");
        window.location.href = "index.html";
    }
}

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}