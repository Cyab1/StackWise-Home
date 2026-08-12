import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Modal from "../components/Modal";
import { PriorityBadge } from "../components/StatusBadge";
import useTasks from "../hooks/useTasks";
import { deleteProject } from "../api/projects";

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

function TaskForm({ onSubmit, onClose, initialData }) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      due_date: "",
    },
  );
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
          Task title
        </label>
        <input
          style={inputStyle}
          placeholder="What needs to be done?"
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
          style={{ ...inputStyle, resize: "vertical", minHeight: "60px" }}
          placeholder="Optional details…"
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
            Priority
          </label>
          <select
            style={inputStyle}
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            {["low", "medium", "high", "critical"].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
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
            Status
          </label>
          <select
            style={inputStyle}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            {["todo", "in_progress", "in_review", "done"].map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
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
          {loading ? "Saving…" : initialData ? "Update task" : "Add task"}
        </button>
      </div>
    </form>
  );
}

const columns = [
  { key: "todo", label: "To Do" },
  { key: "in_progress", label: "In Progress" },
  { key: "in_review", label: "In Review" },
  { key: "done", label: "Done" },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, loading, addTask, editTask, removeTask } = useTasks(id);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = async () => {
    if (window.confirm("Delete this project and all its tasks?")) {
      await deleteProject(id);
      navigate("/projects");
    }
  };

  return (
    <AppLayout>
      <div
        style={{
          padding: "28px 32px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <button
            onClick={() => navigate("/projects")}
            style={{
              background: "none",
              border: "none",
              color: "var(--sw-green)",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: "6px",
              padding: 0,
            }}
          >
            ← Back to Projects
          </button>
          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--sw-text)",
            }}
          >
            Project Tasks
          </h1>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleDelete}
            style={{
              padding: "7px 14px",
              borderRadius: "6px",
              border: "1.5px solid #fca5a5",
              background: "var(--sw-fail-bg)",
              color: "var(--sw-fail)",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Delete Project
          </button>
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
            }}
          >
            + Add Task
          </button>
        </div>
      </div>

      <div style={{ padding: "24px 32px 40px" }}>
        {loading ? (
          <div style={{ color: "var(--sw-text-muted)" }}>Loading tasks…</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "14px",
            }}
          >
            {columns.map((col) => {
              const colTasks = tasks.filter((t) => t.status === col.key);
              return (
                <div
                  key={col.key}
                  style={{
                    background: "var(--sw-white)",
                    border: "1.5px solid var(--sw-border)",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      padding: "14px 16px 12px",
                      borderBottom: "1px solid var(--sw-border)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12.5px",
                        fontWeight: 700,
                        color: "var(--sw-text)",
                        textTransform: "uppercase",
                        letterSpacing: ".4px",
                      }}
                    >
                      {col.label}
                    </span>
                    <span
                      style={{
                        background: "var(--sw-bg)",
                        border: "1px solid var(--sw-border)",
                        color: "var(--sw-text-muted)",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "1px 7px",
                        borderRadius: "10px",
                      }}
                    >
                      {colTasks.length}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      flex: 1,
                    }}
                  >
                    {colTasks.map((task) => (
                      <div
                        key={task.id}
                        style={{
                          background: "var(--sw-bg)",
                          border: "1.5px solid var(--sw-border)",
                          borderRadius: "6px",
                          padding: "12px",
                          cursor: "pointer",
                          transition: "all .15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--sw-teal)";
                          e.currentTarget.style.background = "var(--sw-white)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--sw-border)";
                          e.currentTarget.style.background = "var(--sw-bg)";
                        }}
                      >
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "var(--sw-text)",
                            marginBottom: "8px",
                            lineHeight: 1.4,
                          }}
                        >
                          {task.title}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <PriorityBadge priority={task.priority} />
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => setEditingTask(task)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "var(--sw-text-muted)",
                                fontSize: "12px",
                                cursor: "pointer",
                                fontWeight: 500,
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeTask(task.id)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "var(--sw-fail)",
                                fontSize: "12px",
                                cursor: "pointer",
                                fontWeight: 500,
                              }}
                            >
                              Del
                            </button>
                          </div>
                        </div>
                        {task.due_date && (
                          <div
                            style={{
                              fontSize: "11px",
                              color: "var(--sw-text-muted)",
                              marginTop: "6px",
                            }}
                          >
                            Due {task.due_date}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    style={{
                      margin: "0 12px 12px",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1.5px dashed var(--sw-border)",
                      background: "none",
                      color: "var(--sw-text-muted)",
                      fontSize: "13px",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      transition: "all .15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--sw-teal)";
                      e.currentTarget.style.color = "var(--sw-green)";
                      e.currentTarget.style.background = "var(--sw-teal-light)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--sw-border)";
                      e.currentTarget.style.color = "var(--sw-text-muted)";
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    + Add task
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && (
        <Modal title="Add task" onClose={() => setShowModal(false)}>
          <TaskForm onSubmit={addTask} onClose={() => setShowModal(false)} />
        </Modal>
      )}
      {editingTask && (
        <Modal title="Edit task" onClose={() => setEditingTask(null)}>
          <TaskForm
            initialData={editingTask}
            onSubmit={(data) => editTask(editingTask.id, data)}
            onClose={() => setEditingTask(null)}
          />
        </Modal>
      )}
    </AppLayout>
  );
}
