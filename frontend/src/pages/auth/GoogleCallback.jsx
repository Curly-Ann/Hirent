import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const processedRef = useRef(false); // prevent multiple executions

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const handleCallback = () => {
      try {
        const token = searchParams.get("token");
        const userParam = searchParams.get("user");
        const error = searchParams.get("error");

        if (error) {
          throw new Error(decodeURIComponent(error));
        }

        if (!token) {
          throw new Error("Missing authentication token");
        }

        let userData = null;
        if (userParam) {
          try {
            userData = JSON.parse(decodeURIComponent(userParam));
          } catch (parseErr) {
            console.error("Error parsing user data:", parseErr);
          }
        }

        login(token, userData);

        const userRole = userData?.role || "renter";
        const isNewUser = userData?.isNewUser;

        setTimeout(() => {
          // New user flow
          if (isNewUser) {
            if (userRole === "owner") {
              navigate("/ownersetup", {
                replace: true,
                state: { googleData: userData, message: "Complete your owner profile" },
              });
            } else {
              navigate("/signup", {
                replace: true,
                state: { googleData: userData, message: "Complete your profile" },
              });
            }
          } else {
            // Existing user flow
            if (userRole === "owner") {
              if (!userData?.ownerSetupCompleted) {
                navigate("/ownersetup", { replace: true });
              } else {
                navigate("/owner", { replace: true }); // Redirect to owner folder
              }
            } else {
              navigate("/", { replace: true }); // Redirect renter to home
            }
          }
        }, 100); // small delay to ensure login state is set
      } catch (err) {
        console.error("Google callback error:", err);
        navigate("/signup", {
          replace: true,
          state: { error: err.message },
        });
      }
    };

    handleCallback();
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
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Signing you in with Google...
        </p>
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
