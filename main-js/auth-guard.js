function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function getRootPrefix() {
    const path = window.location.pathname;

    if (path.includes("/learner/") || path.includes("/tutor/")) {
        return "../";
    }

    return "./";
}

function requireRole(requiredRole) {
    const user = getCurrentUser();
    const rootPrefix = getRootPrefix();

    if (!user) {
        window.location.href = `${rootPrefix}account.html?role=${requiredRole}`;
        return;
    }

    if (user.role !== requiredRole) {
        alert("You are not allowed to access this page.");
        window.location.href = `${rootPrefix}index.html`;
    }
}

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = `${getRootPrefix()}index.html`;
}
