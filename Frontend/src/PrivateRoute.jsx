import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "./store/authSlice";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isAuthenticated) {
      autoLogin(token);
    }
  }, [isAuthenticated]);

  const autoLogin = async (token) => {
    try {
      const res = await fetch("http://localhost:3000/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token to backend
        },
      });

      const result = await res.json();
      if (res.ok) {
        if (result.user.role === "user") {
          dispatch(loginUser(result.user));
          navigate("/");
        } else if (result.user.role === "admin") {
          dispatch(loginUser(result.user));
          navigate("/admin");
        }
      } else {
        console.log("Invalid token, redirecting to login");
        localStorage.removeItem("token");
        // Redirect to login if token is invalid
        <Navigate to="/login" />;
      }
    } catch (error) {
      console.error("Error during auto-login", error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/not-authorized" />;
  }
  return children;
};

export default ProtectedRoute;
