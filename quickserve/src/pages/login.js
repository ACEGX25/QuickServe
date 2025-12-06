import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { FaUserAlt, FaKey } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
  
    e.preventDefault();
    alert("Login success (prototype)");
  }

  return (
    <Card>
      <h1 className="brand">Quickserve</h1>
      <p className="subtitle">Sign in to your account</p>

      <form className="form" onSubmit={handleSubmit}>

        <label className="input-pill">
          <FaUserAlt />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
        </label>

        <label className="input-pill">
          <FaKey />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </label>

        <button className="cta" type="submit">Login</button>

        <div className="links">
          <Link to="/register">Create new account</Link>
        </div>

      </form>
    </Card>
  );
}

