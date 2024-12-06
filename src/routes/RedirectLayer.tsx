import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
const RedirectLayer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <div>Loading..</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default RedirectLayer;
