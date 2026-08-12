import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import useAuthStore from "../store/authStore";
import useProjects from "../hooks/useProjects";
import { StatusBadge } from "../components/StatusBadge";

export default function Dashboard() {
  const { user } = useAuthStore();
  const { projects, loading } = useProjects();
  const navigate = useNavigate();

  const active = projects.filter((p) => p.status === "active").length;
  const totalTasks = projects.reduce((sum, p) => sum + (p.task_count || 0), 0);

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      sub: `${active} active`,
      accent: "var(--sw-green)",
    },
    {
      label: "Open Tasks",
      value: totalTasks,
      sub: "across all projects",
      accent: "var(--sw-teal)",
    },
    {
      label: "Active Projects",
      value: active,
      sub: "in progress now",
      accent: "var(--sw-warn)",
    },
  ];

  return (
    <AppLayout>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            padding: "28px 32px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--sw-text)",
              }}
            >
              Good to see you, {user?.username} 👋
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "var(--sw-text-muted)",
                marginTop: "2px",
              }}
            >
              Here's your SecureTask overview
            </p>
          </div>
          <button
            onClick={() => navigate("/projects")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "13.5px",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              background: "var(--sw-green)",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
            }}
          >
            + New Project
          </button>
        </div>

        <div style={{ padding: "24px 32px 40px" }}>
          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "16px",
              marginBottom: "28px",
            }}
          >
            {stats.map(({ label, value, sub, accent }) => (
              <div
                key={label}
                style={{
                  background: "var(--sw-white)",
                  border: "1.5px solid var(--sw-border)",
                  borderRadius: "10px",
                  padding: "20px 22px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: accent,
                  }}
                />
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--sw-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "var(--sw-text)",
                    marginTop: "4px",
                    letterSpacing: "-1px",
                  }}
                >
                  {loading ? "—" : value}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--sw-text-muted)",
                    marginTop: "2px",
                  }}
                >
                  {sub}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Projects */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--sw-text)",
              }}
            >
              Recent Projects
            </span>
            <button
              onClick={() => navigate("/projects")}
              style={{
                background: "none",
                border: "none",
                color: "var(--sw-green)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View all →
            </button>
          </div>

          <div
            style={{
              background: "var(--sw-white)",
              border: "1.5px solid var(--sw-border)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {loading ? (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "var(--sw-text-muted)",
                }}
              >
                Loading projects…
              </div>
            ) : projects.length === 0 ? (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "var(--sw-text-muted)",
                }}
              >
                No projects yet. Create your first one!
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Project", "Status", "Tasks", "Due"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "10px 16px",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          color: "var(--sw-text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: ".5px",
                          borderBottom: "1.5px solid var(--sw-border)",
                          background: "var(--sw-bg)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projects.slice(0, 5).map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => navigate(`/projects/${p.id}`)}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--sw-bg)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td
                        style={{
                          padding: "13px 16px",
                          borderBottom: "1px solid var(--sw-border)",
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: "13.5px" }}>
                          {p.title}
                        </div>
                        {p.description && (
                          <div
                            style={{
                              fontSize: "12px",
                              color: "var(--sw-text-muted)",
                              marginTop: "2px",
                            }}
                          >
                            {p.description.slice(0, 50)}
                            {p.description.length > 50 ? "…" : ""}
                          </div>
                        )}
                      </td>
                      <td
                        style={{
                          padding: "13px 16px",
                          borderBottom: "1px solid var(--sw-border)",
                        }}
                      >
                        <StatusBadge status={p.status} />
                      </td>
                      <td
                        style={{
                          padding: "13px 16px",
                          borderBottom: "1px solid var(--sw-border)",
                          fontSize: "13px",
                          color: "var(--sw-text-muted)",
                        }}
                      >
                        {p.task_count} task{p.task_count !== 1 ? "s" : ""}
                      </td>
                      <td
                        style={{
                          padding: "13px 16px",
                          borderBottom: "1px solid var(--sw-border)",
                          fontSize: "13px",
                          color: "var(--sw-text-muted)",
                        }}
                      >
                        {p.due_date || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
