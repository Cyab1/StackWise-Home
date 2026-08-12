import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import useAuthStore from "../../store/authStore";

const LogoMark = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="8" y="3" width="6" height="4" rx="2" fill="#1D9E75" />
    <rect
      x="4"
      y="9"
      width="14"
      height="4"
      rx="2"
      fill="#1D9E75"
      opacity="0.75"
    />
    <rect
      x="1"
      y="15"
      width="20"
      height="4"
      rx="2"
      fill="#1D9E75"
      opacity="0.5"
    />
  </svg>
);

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login/", form);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      const profile = await api.get("/auth/profile/");
      setUser(profile.data);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--sw-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(93,202,165,1) 40px, rgba(93,202,165,1) 41px),
          repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(93,202,165,1) 40px, rgba(93,202,165,1) 41px)`,
        }}
      />

      <div
        style={{
          background: "var(--sw-white)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "420px",
          padding: "36px",
          boxShadow: "0 24px 80px rgba(0,0,0,.25)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "28px",
          }}
        >
          <LogoMark />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "17px",
              color: "var(--sw-text)",
            }}
          >
            StackWise{" "}
            <span style={{ color: "var(--sw-text-muted)", fontWeight: 400 }}>
              / SecureTask
            </span>
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--sw-text)",
            marginBottom: "4px",
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontSize: "13.5px",
            color: "var(--sw-text-muted)",
            marginBottom: "24px",
          }}
        >
          Sign in to your workspace
        </p>

        {error && (
          <div
            style={{
              background: "var(--sw-fail-bg)",
              color: "var(--sw-fail)",
              padding: "10px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              style={{
                fontSize: "12.5px",
                fontWeight: 600,
                color: "var(--sw-text-muted)",
              }}
            >
              Email address
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{
                padding: "9px 13px",
                border: "1.5px solid var(--sw-border)",
                borderRadius: "6px",
                fontSize: "13.5px",
                fontFamily: "Inter, sans-serif",
                color: "var(--sw-text)",
                background: "var(--sw-bg)",
                outline: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              style={{
                fontSize: "12.5px",
                fontWeight: 600,
                color: "var(--sw-text-muted)",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{
                padding: "9px 13px",
                border: "1.5px solid var(--sw-border)",
                borderRadius: "6px",
                fontSize: "13.5px",
                fontFamily: "Inter, sans-serif",
                color: "var(--sw-text)",
                background: "var(--sw-bg)",
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              background: loading ? "var(--sw-dark-mid)" : "var(--sw-green)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "14.5px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'DM Sans', sans-serif",
              marginTop: "4px",
              transition: "background .15s",
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "13px",
            color: "var(--sw-text-muted)",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "var(--sw-green)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
