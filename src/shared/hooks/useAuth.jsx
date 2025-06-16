export const useAuth = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const isAuthenticated = !!token;
    const isAdmin = role === "ADMIN_ROLE";
    const isUser = role === "USER_ROLE";

    return { token, role, isAuthenticated, isAdmin, isUser};
};