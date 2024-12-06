import { Outlet, Navigate, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
const PublicRoutes: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading..</div>;
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
