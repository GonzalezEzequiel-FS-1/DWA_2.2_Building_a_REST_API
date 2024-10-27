import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);  // Start as loading
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const logCheck = async () => {
      const loggedUser = await AuthService.getCurrentUser();
      if (loggedUser && loggedUser.valid) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    };

    logCheck();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
