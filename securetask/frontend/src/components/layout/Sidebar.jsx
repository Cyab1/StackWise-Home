import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const LogoMark = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="8" y="3" width="6" height="4" rx="2" fill="#5DCAA5" />
    <rect
      x="4"
      y="9"
      width="14"
      height="4"
      rx="2"
      fill="#5DCAA5"
      opacity="0.75"
    />
    <rect
      x="1"
      y="15"
      width="20"
      height="4"
      rx="2"
      fill="#5DCAA5"
      opacity="0.5"
    />
  </svg>
);

const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="1" y="1" width="6" height="6" rx="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" />
      </svg>
    ),
  },
  {
    to: "/projects",
    label: "Projects",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 3a1 1 0 011-1h3l1.5 2H13a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1V3z" />
      </svg>
    ),
  },
  {
    to: "/tasks",
    label: "My Tasks",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 4h12M2 8h8M2 12h5" />
      </svg>
    ),
  },
  {
    to: "/profile",
    label: "Profile",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="8" cy="5" r="3" />
        <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const initial = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "var(--sw-dark)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      {/* Brand */}
      <div
        style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid rgba(93,202,165,.15)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <LogoMark />
        <div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: "#fff",
              letterSpacing: "-.2px",
            }}
          >
            SecureTask
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "var(--sw-teal)",
              letterSpacing: ".5px",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            by StackWise
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "12px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: ".8px",
            textTransform: "uppercase",
            color: "rgba(93,202,165,.5)",
            padding: "12px 10px 6px",
            display: "block",
          }}
        >
          Workspace
        </span>
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 12px",
              borderRadius: "6px",
              fontSize: "13.5px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all .15s",
              background: isActive ? "rgba(93,202,165,.18)" : "transparent",
              color: isActive ? "#fff" : "rgba(255,255,255,.65)",
            })}
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "14px 10px",
          borderTop: "1px solid rgba(93,202,165,.15)",
        }}
      >
        <div
          onClick={() => navigate("/profile")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "var(--sw-dark-mid)",
              border: "2px solid rgba(93,202,165,.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "13px",
              color: "var(--sw-teal)",
              fontFamily: "'DM Sans', sans-serif",
              flexShrink: 0,
            }}
          >
            {initial}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#fff",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.username || "User"}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,.45)" }}>
              {user?.email || ""}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "9px 12px",
            borderRadius: "6px",
            color: "rgba(255,255,255,.45)",
            fontSize: "13.5px",
            fontWeight: 500,
            cursor: "pointer",
            border: "none",
            background: "none",
            width: "100%",
            textAlign: "left",
            fontFamily: "Inter, sans-serif",
            marginTop: "4px",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  );
}
