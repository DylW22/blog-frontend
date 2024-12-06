import React from "react";
import { ProtectionLayer } from "../protectedLogin/ProtectionLayer";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "../routes/PublicRoutes";
import Index from "../pages/Index";
import Layout from "../pages/Layout";
const Application: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-400 via-gray-200 to-gray-100">
      <ProtectionLayer>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index={true} element={<Index />} />
            </Route>
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="*" element={<div>Error Page</div>} />
          </Routes>
        </Router>
      </ProtectionLayer>
    </div>
  );
};

export default Application;
