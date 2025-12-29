import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import {
  FaUserAlt,
  FaKey,
  FaUser,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./register.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setStatus("Passwords do not match");
      return;
    }

    setStatus("Creating account...");
  }

  return (
    <div className="app-bg">
      <div className="card-wrapper">
        <Card>
          {/* Logo */}
<div className="flex justify-center mb-6">
  <div className="relative inline-block text-center">
    {/* Top slanted bars */}
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-5 h-1.5 bg-blue-500 rotate-[-25deg] rounded"
        />
      ))}
    </div>

    {/* Brand text */}
    <h1 className="text-4xl font-extrabold tracking-wider">
      QUICKSERVE
    </h1>

    {/* Bottom underline */}
    <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-[160px] h-[8px] border-b-2 border-black rounded-full"></span>
  </div>
</div>


          <p className="subtitle">Create your account</p>

          <form className="form" onSubmit={handleSubmit}>
            {/* USERNAME */}
            <div className="input-pill">
              <FaUserAlt />
              <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="input-pill">
              <FaUserAlt />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="input-pill">
  <FaKey />
  <input
    name="password"
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
    required
  />
  
</div>





            {/* CONFIRM PASSWORD */}
            
<div className="input-pill">
  <FaKey />
  <input
    name="confirm"
    type={showConfirm ? "text" : "password"}
    placeholder="Confirm Password"
    value={form.confirm}
    onChange={handleChange}
    required
  />
  
</div>

            {/* ROLE */}
            <div className="input-pill">
              <FaUser />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="customer">Customer</option>
                <option value="provider">Service Provider</option>
                <option value="administrator">Admin</option>
              </select>
            </div>

            <button className="cta">Create Account</button>

            <div className="links">
              <Link to="/">Already have an account? Login</Link>
            </div>

            <div style={{ textAlign: "center" }}>{status}</div>
          </form>
        </Card>
      </div>
    </div>
  );
}
