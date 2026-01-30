export async function getUser() {
    // Check if we are on the client
    if (typeof window !== "undefined") {
        try {
            const response = await fetch("/api/auth/me");
            if (!response.ok) return null;
            const data = await response.json();
            return data.user;
        } catch (e) {
            return null;
        }
    }

    // On the server, we import the server-only auth logic dynamically
    // or use a different approach. However, for client components calling this in useEffect,
    // the above branch is what matters.
    return null;
}

export async function deleteSession() {
    if (typeof window !== "undefined") {
        // For client-side "logout", we usually call a server action or an API
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
    }
}
