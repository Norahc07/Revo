import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, getCurrentUser } from "../utils/auth.js";

export default function Auth() {
  const navigate = useNavigate();
  const existing = getCurrentUser();

  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState(existing?.username || "");
  const [email, setEmail] = useState(existing?.email || "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const isRegister = mode === "register";

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    const action = isRegister
      ? registerUser({ username, email, password })
      : loginUser({ email, password });

    if (!action.ok) {
      setErrors({ [action.field]: action.message });
      return;
    }
    navigate("/home", { replace: true });
  }

  return (
    <section className="auth-screen">
      <div className="auth-card">
        <button
          type="button"
          className="back-link"
          aria-label="Back to landing"
          onClick={() => navigate("/")}
        >
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
        </button>
        <img
          src="/ReVo_logo-removebg-preview.png"
          alt="ReVo"
          className="auth-logo"
        />
        <h1>{isRegister ? "Create account" : "Login"}</h1>
        <p className="muted small">
          {isRegister
            ? "Create an account to save your ReVo progress on this device."
            : "Welcome back. Sign in to continue your learning streak."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <div className="field">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <div className="field-error">{errors.username}</div>
              )}
            </div>
          )}

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="field-error">{errors.password}</div>
            )}
            <label className="show-password-row small">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />{" "}
              Show password
            </label>
          </div>

          <button type="submit" className="primary-btn">
            {isRegister ? "Create account" : "Login"}
          </button>
        </form>

        <button
          type="button"
          className="link-btn"
          onClick={() => setMode(isRegister ? "login" : "register")}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don’t have an account? Create one"}
        </button>
      </div>
    </section>
  );
}

