// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "./../api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken, setRefreshToken, setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset the error message

    try {
      const response = await api.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, refreshToken, data } = response.data;

        // Check if data and user object exist and has the role property
        if (data && data.user && data.user.role) {
          const user = data.user;
          setToken(token);
          setRefreshToken(refreshToken);
          setUser(user);

          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);

          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        } else {
          setError("Invalid response from server.");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Login unsuccessful. Please check your credentials.");
    }
  };

  return (
    <>
      <main className="login">
        <div className="login-form">
          <h2 className="login-heading mb-lg">Log into your account</h2>
          {error && <p className="error-message">{error}</p>}

          <form className="form form--login" onSubmit={handleSubmit}>
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                className="form__input"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form__group mb-md">
              <label className="form__label" htmlFor="password">
                Password
              </label>
              <input
                className="form__input"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green">Login</button>
              <p className="create-account">
                Don't have a account? <a href="/register">Create Account</a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
