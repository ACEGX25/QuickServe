import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { FaUserAlt, FaKey, FaUser } from "react-icons/fa";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: "",
    role: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Account created (prototype)");
  }

  return (
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
          />
        </label>


        <label className="input-pill">
          <FaKey />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </label>

        
        <label className="input-pill">
          <FaKey />
          <input
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        </label>

        
        <label className="input-pill">
          <FaUser />
          <select name="role" onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="service_provider">Service Provider</option>
          </select>
        </label>

        <button className="cta" type="submit">Create Account</button>

        <div className="links">
          <Link to="/">Already have an account? Login</Link>
        </div>

      </form>
    </Card>
  );
}
