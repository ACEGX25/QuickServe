import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { FaUserAlt, FaKey, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css"

const API_BASE = "http://localhost:8080";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
  });
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setStatus("Passwords do not match");
      return;
    }
    if (!form.role) {
      setStatus("Please select a role");
      return;
    }
    setStatus("Creating account...");
    try {
      // backend Role enum: CUSTOMER, PROVIDER, ADMIN
      const roleEnum = form.role.toUpperCase(); // "CUSTOMER" | "PROVIDER"
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          credentials: "include",
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          role: roleEnum,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setStatus(msg || "Registration failed");
        return;
      }
      setStatus("✅ Account created. You can now login.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Network error");
    }
  }

  return (
      <div className="app-bg">
      <Card>
        <h1 className="brand">Quickserve</h1>
        <p className="subtitle">Create your account</p>

        <form className="form" onSubmit={handleSubmit}>
          <label className="input-pill">
            <FaUserAlt />
            <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={form.username}
                required
            />
          </label>

          <label className="input-pill">
            <FaUserAlt />
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                required
            />
          </label>

          <label className="input-pill" style={{ position: "relative" }}>
            <FaKey />
            <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  padding: 4,
                  cursor: "pointer",
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </label>

          <label className="input-pill" style={{ position: "relative" }}>
            <FaKey />
            <input
                name="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={handleChange}
                value={form.confirm}
                required
            />
            <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  padding: 4,
                  cursor: "pointer",
                }}
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </label>

          <label className="input-pill">
            <FaUser />
            <select name="role" onChange={handleChange} value={form.role} required>
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="provider">Service Provider</option>
              <option value="administrator">Admin</option>
            </select>
          </label>

          <button className="cta" type="submit">Create Account</button>

          <div className="links">
            <Link to="/">Already have an account? Login</Link>
          </div>

          <div style={{ marginTop: 12 }}>{status}</div>
        </form>
      </Card>
      </div>
  );
}