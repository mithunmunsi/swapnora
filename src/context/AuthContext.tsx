import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "./../api";
import { User } from "../types/User"; // <-- Correct import

export interface AuthContextProps {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  refreshToken: null,
  user: null,
  setToken: () => {},
  setRefreshToken: () => {},
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const navigate = useNavigate();

  // Declare handleLogout using useCallback
  const handleLogout = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]); // Add 'navigate' as a dependency

  useEffect(() => {
    const fetchNewToken = async () => {
      if (!refreshToken) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.post("/api/v1/auth/refresh-token", {
          refreshToken,
        });

        const newUser: User = response.data.user;
        setToken(response.data.token);
        setRefreshToken(response.data.refreshToken);
        setUser(newUser);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(newUser));
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          console.error("Refresh token invalid or expired:", err);
          handleLogout();
        } else {
          console.error("Failed to refresh token:", err);
        }
      }
    };

    // If there's a refreshToken but no token, try refreshing the token
    if (!token && refreshToken) {
      fetchNewToken();
    }
  }, [token, refreshToken, navigate, handleLogout]);

  const value = {
    token,
    refreshToken,
    user,
    setToken: (newToken: string | null) => {
      setToken(newToken);
      if (newToken) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
      }
    },
    setRefreshToken: (newRefreshToken: string | null) => {
      setRefreshToken(newRefreshToken);
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      } else {
        localStorage.removeItem("refreshToken");
      }
    },
    setUser: (newUser: User | null) => {
      setUser(newUser);
      if (newUser) {
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("user");
      }
    },
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
