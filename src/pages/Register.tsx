// src/pages/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/api/v1/auth/register", {
        name,
        email,
        username,
        password,
        confirmPassword,
      });
      console.log("Ragistration is successfull", res.data);
      navigate("/login");
      console.log("API Base URL:", import.meta.env.VITE_DEV_API_URL);
    } catch (err) {
      console.error(err);
      setError("Registration is failed");
    }
  };

  return (
    <main className="register">
      <div className="register-form">
        <h2 className="register-heading mb-lg">Create your account!</h2>
        <form className="form form--signup" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Your name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="username">
              Username
            </label>
            <input
              className="form__input"
              id="username"
              type="text"
              placeholder="Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div className="form__group mb-md">
            <label className="form__label" htmlFor="passwordConfirm">
              Confirm password
            </label>
            <input
              className="form__input"
              id="passwordConfirm"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div className="form__group">
            {error && <p className="error-message">{error}</p>}

            <button className="btn btn--green" type="submit">
              Sign up
            </button>
            <p className="create-account">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
