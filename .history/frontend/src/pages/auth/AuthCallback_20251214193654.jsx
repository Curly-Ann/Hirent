import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userStr = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      console.error("Auth error:", error);
      navigate("/signup?error=" + encodeURIComponent(error));
      return;
    }

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        console.log("Google auth successful, user role:", user.role);
        
        // Login with token
        login(token);

        // Redirect based on role
        if (user.role === "owner") {
          navigate("/owner/dashboard");
        } else {
          navigate("/homepage");
        }
      } catch (err) {
        console.error("Failed to parse auth data:", err);
        navigate("/signup?error=Authentication failed");
      }
    } else {
      navigate("/signup?error=Missing authentication data");
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7A1CA9] mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
