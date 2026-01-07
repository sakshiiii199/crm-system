import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Login failed");

      const response = await res.json();

      localStorage.setItem("role", response.role);
      localStorage.setItem("email", response.email);
      localStorage.setItem("id", response.id);
      localStorage.setItem("username", response.username);

      if (response.role === "ADMIN") navigate("/admin");
      else if (response.role === "EMPLOYEE") navigate(`/employee/${response.id}`);
      else navigate("/customer");

    } catch {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        
        {/* Logo */}
        <div className="logo">
          <span>CRM</span>
        </div>

        <h2>Sign In Access</h2>
        <p className="subtitle">
          You must become a member to login and access the entire site
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <span
              className="toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="forgot">Forgot Password?</div>

          <button disabled={loading}>
            {loading ? "Signing In..." : "SIGN IN"}
          </button>
        </form>

        <div className="signup">
          Not a member yet? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}