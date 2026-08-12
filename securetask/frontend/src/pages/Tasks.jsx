import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { StatusBadge, PriorityBadge } from "../components/StatusBadge";
import { getTasks } from "../api/tasks";

const filters = ["all", "todo", "in_progress", "in_review", "done"];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    getTasks()
      .then(({ data }) => setTasks(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <AppLayout>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ padding: "28px 32px 0" }}>
          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--sw-text)",
            }}
          >
            My Tasks
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--sw-text-muted)",
              marginTop: "2px",
            }}
          >
            {tasks.length} tasks across all projects
          </p>
        </div>

        <div style={{ padding: "24px 32px 40px" }}>
          <div
            style={{
              display: "flex",
              gap: "4px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "1.5px solid transparent",
                  fontFamily: "Inter, sans-serif",
                  background: filter === f ? "var(--sw-green)" : "none",
                  color: filter === f ? "#fff" : "var(--sw-text-muted)",
                  borderColor: filter === f ? "var(--sw-green)" : "transparent",
                  transition: "all .15s",
                }}
              >
                {f.replace("_", " ")}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ color: "var(--sw-text-muted)" }}>Loading tasks…</div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "var(--sw-text-muted)",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "var(--sw-text)",
                  marginBottom: "6px",
                }}
              >
                No tasks found
              </p>
              <p style={{ fontSize: "13px" }}>
                Try a different filter or assign yourself some tasks
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "var(--sw-white)",
                border: "1.5px solid var(--sw-border)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Task", "Project", "Priority", "Status", "Due"].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "10px 14px",
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
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((task) => (
                    <tr
                      key={task.id}
                      onClick={() => navigate(`/projects/${task.project}`)}
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
                          padding: "13px 14px",
                          borderBottom: "1px solid var(--sw-border)",
                          fontWeight: 600,
                          fontSize: "13.5px",
                        }}
                      >
                        {task.title}
                      </td>
                      <td
                        style={{
                          padding: "13px 14px",
                          borderBottom: "1px solid var(--sw-border)",
                          fontSize: "12.5px",
                          color: "var(--sw-text-muted)",
                        }}
                      >
                        Project #{task.project}
                      </td>
                      <td
                        style={{
                          padding: "13px 14px",
                          borderBottom: "1px solid var(--sw-border)",
                        }}
                      >
                        <PriorityBadge priority={task.priority} />
                      </td>
                      <td
                        style={{
                          padding: "13px 14px",
                          borderBottom: "1px solid var(--sw-border)",
                        }}
                      >
                        <StatusBadge status={task.status} />
                      </td>
                      <td
                        style={{
                          padding: "13px 14px",
                          borderBottom: "1px solid var(--sw-border)",
                          fontSize: "13px",
                          color: "var(--sw-text-muted)",
                        }}
                      >
                        {task.due_date || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
