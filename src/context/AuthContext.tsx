import { createContext, useState, useEffect } from "react";

import { AuthContextType, User } from "../types/auth";

import api from "../services/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);

      setUser(JSON.parse(storedUser));

      refreshUser();
    }

    setLoading(false);
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);

    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setToken(null);

    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const response = await api.get("/users/profile");

      const updatedUser = response.data.user;

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to refresh user", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
