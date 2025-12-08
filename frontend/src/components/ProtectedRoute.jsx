import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * ProtectedRoute - Restricts access to routes based on user role
 * 
 * @param {React.ReactNode} children - Component to render if user has required role
 * @param {string} requiredRole - Required role ('owner', 'admin', 'renter', etc.)
 * 
 * Usage:
 * <ProtectedRoute requiredRole="owner">
 *   <OwnerDashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, user } = useContext(AuthContext);

  // Not logged in - redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but doesn't have required role
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-lg text-gray-600 mb-8">
            You don't have access to this page. You are logged in as a <span className="font-semibold capitalize">{user?.role}</span>.
          </p>
          <p className="text-gray-500 mb-8">
            Only {requiredRole}s can access this section.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Back to Home
            </a>
            <a
              href="/account"
              className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
            >
              My Account
            </a>
          </div>
        </div>
      </div>
    );
  }

  // User is logged in and has required role
  return children;
};

export default ProtectedRoute;
