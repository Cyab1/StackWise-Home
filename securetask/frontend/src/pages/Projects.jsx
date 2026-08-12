import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Modal from "../components/Modal";
import { StatusBadge } from "../components/StatusBadge";
import useProjects from "../hooks/useProjects";

const inputStyle = {
  padding: "9px 13px",
  border: "1.5px solid var(--sw-border)",
  borderRadius: "6px",
  fontSize: "13.5px",
  fontFamily: "Inter, sans-serif",
  color: "var(--sw-text)",
  background: "var(--sw-bg)",
  outline: "none",
  width: "100%",
};

function ProjectForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "planning",
    due_date: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label
          style={{
            fontSize: "12.5px",
            fontWeight: 600,
            color: "var(--sw-text-muted)",
          }}
        >
          Project title
        </label>
        <input
          style={inputStyle}
          placeholder="e.g. SecureTask MVP"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
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
          Description
        </label>
        <textarea
          style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
          placeholder="What is this project about?"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label
            style={{
              fontSize: "12.5px",
              fontWeight: 600,
              color: "var(--sw-text-muted)",
            }}
          >
            Status
          </label>
          <select
            style={inputStyle}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            {["planning", "active", "on_hold", "completed", "archived"].map(
              (s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ),
            )}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label
            style={{
              fontSize: "12.5px",
              fontWeight: 600,
              color: "var(--sw-text-muted)",
            }}
          >
            Due date
          </label>
          <input
            style={inputStyle}
            type="date"
            value={form.due_date}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
          paddingTop: "4px",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1.5px solid var(--sw-border)",
            background: "var(--sw-white)",
            color: "var(--sw-text)",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "13.5px",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            background: "var(--sw-green)",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "13.5px",
          }}
        >
          {loading ? "Creating…" : "Create project"}
        </button>
      </div>
    </form>
  );
}

export default function Projects() {
  const { projects, loading, addProject } = useProjects();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
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
              Projects
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "var(--sw-text-muted)",
                marginTop: "2px",
              }}
            >
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              background: "var(--sw-green)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "13.5px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            + New Project
          </button>
        </div>

        <div style={{ padding: "24px 32px 40px" }}>
          {loading ? (
            <div style={{ color: "var(--sw-text-muted)" }}>
              Loading projects…
            </div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 22 22"
                fill="none"
                style={{ opacity: 0.3, marginBottom: "16px" }}
              >
                <rect
                  x="8"
                  y="3"
                  width="6"
                  height="4"
                  rx="2"
                  fill="var(--sw-green)"
                />
                <rect
                  x="4"
                  y="9"
                  width="14"
                  height="4"
                  rx="2"
                  fill="var(--sw-green)"
                  opacity="0.75"
                />
                <rect
                  x="1"
                  y="15"
                  width="20"
                  height="4"
                  rx="2"
                  fill="var(--sw-green)"
                  opacity="0.5"
                />
              </svg>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "var(--sw-text)",
                  marginBottom: "6px",
                }}
              >
                No projects yet
              </p>
              <p style={{ fontSize: "13px", color: "var(--sw-text-muted)" }}>
                Create your first project to get started
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  style={{
                    background: "var(--sw-white)",
                    border: "1.5px solid var(--sw-border)",
                    borderRadius: "10px",
                    padding: "20px",
                    cursor: "pointer",
                    transition: "all .18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--sw-teal)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(29,158,117,.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--sw-border)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "var(--sw-text)",
                      }}
                    >
                      {project.title}
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                  {project.description && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--sw-text-muted)",
                        lineHeight: 1.5,
                        marginBottom: "14px",
                      }}
                    >
                      {project.description.slice(0, 80)}
                      {project.description.length > 80 ? "…" : ""}
                    </p>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "14px",
                      borderTop: "1px solid var(--sw-border)",
                      fontSize: "12px",
                      color: "var(--sw-text-muted)",
                    }}
                  >
                    <span>
                      {project.task_count} task
                      {project.task_count !== 1 ? "s" : ""}
                    </span>
                    {project.due_date && <span>Due {project.due_date}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <Modal title="Create new project" onClose={() => setShowModal(false)}>
          <ProjectForm
            onSubmit={addProject}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </AppLayout>
  );
}
