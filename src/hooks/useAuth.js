const useAuth = () => {
  return { isAuthenticated: !!localStorage.getItem("token"), isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false };
};

export default useAuth;
