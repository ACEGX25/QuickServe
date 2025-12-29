import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Card from "../components/card";
import { FaUserAlt, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css"

const API_BASE = "http://localhost:8080";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
    function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Signing in...");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data?.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("detailsFilled",data.detailsFilled);


      const isProvider = data.role.includes("PROVIDER");
        if (isProvider) {
            if (!data.detailsFilled) {
                navigate("/provider/onboard");
            } else {
                navigate("/provider/homepage");
            }
        }
        else {
  navigate("/home"); // 👈 NORMAL USERS GO HERE
}

      setStatus("Login success!");
    } catch (err) {
      console.log(err);
      setStatus("Network error");
    }
  }
    return (
      <div className="app-bg">
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




        <p className="subtitle">Sign in to your account</p>

        <form className="form" onSubmit={handleSubmit}>
          <label className="input-pill">
            <FaUserAlt />
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                required
            />
          </label>

          <label className="input-pill" style={{ position: "relative" }}>
            <FaKey />
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
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

          <button className="cta" type="submit">Login</button>

          <div className="links">
            <Link to="/register">Create new account</Link>
          </div>

          <div style={{ marginTop: 12 }}>{status}</div>
        </form>
      </Card>
      </div>
  );
}