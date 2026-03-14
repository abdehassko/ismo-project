export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getToken = () => localStorage.getItem("token");

export const getRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const isAdmin = () => getRole() === "admin";
export const isFormateur = () => getRole() === "formateur";
export const isUser = () => getRole() === "user";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const isLoggedIn = () => !!localStorage.getItem("token");
