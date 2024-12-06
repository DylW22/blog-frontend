import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContextType, AuthProviderProps, User } from "../types";

import { jwtDecode } from "jwt-decode";
import useRequest2 from "../hooks/useRequest2";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isExpired = (exp: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return exp < currentTime;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
type DecodedToken = {
  userId: number;
  iat: number;
  exp: number;
};
const initialUserState: User | null = null;

// Utility function for managing tokens in sessionStorage
const getStoredToken = () => sessionStorage.getItem("authToken");
const setStoredToken = (token: string) =>
  sessionStorage.setItem("authToken", token);
const clearStoredToken = () => sessionStorage.removeItem("authToken");

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initialUserState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { testLogin, testLogout, error, loading } = useRequest2();

  useEffect(() => {
    setAuthError(error);
  }, [error]);

  const testHandleLogin = async (username: string, password: string) => {
    try {
      const response = await testLogin(username, password);
      if (response && response.token) {
        setUser((prev) => ({ ...prev, token: response.token }));
        setIsAuthenticated(true);
        setStoredToken(response.token);
      } else {
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const testHandleLogout = async () => {
    try {
      if (user?.token) {
        await testLogout(user);
      }

      setUser(initialUserState);
      setIsAuthenticated(false);
      clearStoredToken();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const token = getStoredToken();

    const decodeToken = (token: string): DecodedToken | null => {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (isExpired(decoded?.exp)) {
          return null;
        }
        return decoded;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    };
    if (token) {
      const authUser = decodeToken(token);
      if (!authUser) return;
      setIsAuthenticated(true);
      setUser((prev) => ({
        ...prev,
        displayName: `${authUser.userId}`,
        token,
      }));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        testHandleLogin,
        testHandleLogout,
        // handleLogin,
        //handleLogout,
        loading,
        authError,
        //error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
