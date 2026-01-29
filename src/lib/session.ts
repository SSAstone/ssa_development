export async function getUser() {
    // This is a placeholder for the session management logic.
    // In a real application, this would fetch the user from a cookie or database.
    return {
        name: "Admin User",
        email: "admin@example.com",
        avatar: "/avatars/admin.png",
    };
}

export async function deleteSession() {
    // This is a placeholder for the session deletion logic.
    console.log("Session deleted");
}
