// src/pages/Register.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      const { token, user } = response.data;

      login(token, user);

      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register">
      <div className="register-form">
        <h2 className="register-heading mb-lg">Create your account</h2>

        {error && <p className="error-message">{error}</p>}

        <form className="form form--signup" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="firstName">
              First Name
            </label>

            <input
              className="form__input"
              id="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="lastName">
              Last Name
            </label>

            <input
              className="form__input"
              id="lastName"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email Address
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
              minLength={6}
              required
            />
          </div>

          <div className="form__group mb-md">
            <label className="form__label" htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              className="form__input"
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <div className="form__group">
            <button className="btn btn--green" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="create-account">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
