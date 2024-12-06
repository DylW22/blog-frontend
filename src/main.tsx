// import "./wdyr";
import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/index.css";
import { AuthProvider } from "./context/AuthContext";
import Application from "./components/Application.js";
import { BlogsProvider } from "./context/BlogsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BlogsProvider>
        <Application />
      </BlogsProvider>
    </AuthProvider>
  </React.StrictMode>
);
