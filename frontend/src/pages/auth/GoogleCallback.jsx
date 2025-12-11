import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const processedRef = useRef(false);
  const [loadingMessage, setLoadingMessage] = useState("Completing authentication...");

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const token = searchParams.get("token");
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      console.error("Auth error:", decodeURIComponent(error));
      setLoadingMessage("Authentication failed.");
      navigate("/signup", {
        replace: true,
        state: { error: decodeURIComponent(error) },
      });
      return;
    }

    if (!token) {
      console.error("Missing token");
      setLoadingMessage("Authentication failed: missing token.");
      navigate("/signup", {
        replace: true,
        state: { error: "Missing authentication token" },
      });
      return;
    }

    // Parse user data safely
    let userData = { role: "renter", isNewUser: false };
    if (userParam) {
      try {
        userData = JSON.parse(decodeURIComponent(userParam));
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }

    // Update login context
    login(token, userData);

    // Redirect logic
    const redirectUser = () => {
      if (userData.isNewUser) {
        // New users go to signup/setup
        if (userData.role === "owner") {
          navigate("/ownersetup", {
            replace: true,
            state: { googleData: userData },
          });
        } else {
          navigate("/signup", {
            replace: true,
            state: { googleData: userData },
          });
        }
      } else {
        // Existing users
        if (userData.role === "owner") {
          if (!userData.ownerSetupCompleted) {
            navigate("/ownersetup", { replace: true });
          } else {
            navigate("/owner/dashboard", { replace: true });
          }
        } else {
          navigate("/", { replace: true });
        }
      }
    };

    redirectUser();
  }, [searchParams, navigate, login]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <div className="mb-6">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-16 h-16 mx-auto animate-pulse"
          />
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-4">{loadingMessage}</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Please wait while we complete your authentication
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;
