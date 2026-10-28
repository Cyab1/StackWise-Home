import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewsAdmin.css";

const NEWS_API = import.meta.env.VITE_NEWS_API_URL;
const ADMIN_API = import.meta.env.VITE_NEWS_API_URL;
const TOKEN_KEY = "sw_news_admin_token";

const EMPTY_FORM = {
  type: "launch",
  title: "",
  summary: "",
  body: "",
  url: "",
  url_label: "",
  internal: false,
  published: true,
};

const TYPE_OPTIONS = [
  { value: "launch", label: "Launch" },
  { value: "case-study", label: "Case study" },
  { value: "milestone", label: "Milestone" },
  { value: "incident", label: "Incident" },
  { value: "resolved", label: "Resolved" },
];

function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}
function setToken(t) {
  sessionStorage.setItem(TOKEN_KEY, t);
}
function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}
const authHeaders = () => ({ "X-Admin-Token": getToken() });

// ── Login ─────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`${ADMIN_API}/api/admin/login`, {
        password,
      });
      setToken(data.token);
      onLogin();
    } catch {
      setError("Invalid password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="na-login">
      <div className="na-login-card">
        <h1 className="na-login-title">News Admin</h1>
        <p className="na-login-sub">StackWise · Manage news posts</p>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="na-input"
            required
          />
          {error && <p className="na-error">{error}</p>}
          <button type="submit" className="na-btn-primary" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Post form ─────────────────────────────────────────────────────────────────
function PostForm({ post, onSave, onCancel }) {
  const [form, setForm] = useState(post || EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (post?.id) {
        await axios.put(`${ADMIN_API}/api/admin/news/${post.id}`, form, {
          headers: authHeaders(),
        });
      } else {
        await axios.post(`${ADMIN_API}/api/admin/news`, form, {
          headers: authHeaders(),
        });
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save post");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="na-form" onSubmit={handleSubmit}>
      <div className="na-form-row">
        <div className="na-form-group">
          <label className="na-label">Type</label>
          <select
            name="type"
            className="na-input"
            value={form.type}
            onChange={handleChange}
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="na-form-group">
          <label className="na-label">Published</label>
          <label className="na-toggle">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
            />
            <span>{form.published ? "Published" : "Draft"}</span>
          </label>
        </div>
      </div>

      <div className="na-form-group">
        <label className="na-label">Title *</label>
        <input
          name="title"
          className="na-input"
          placeholder="Post title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="na-form-group">
        <label className="na-label">
          Summary *{" "}
          <span className="na-hint">One paragraph shown in the feed</span>
        </label>
        <textarea
          name="summary"
          className="na-input na-textarea-sm"
          placeholder="Brief summary of the post…"
          value={form.summary}
          onChange={handleChange}
          required
          rows={2}
        />
      </div>

      <div className="na-form-group">
        <label className="na-label">
          Body *{" "}
          <span className="na-hint">
            Full post content. Use blank lines for paragraph breaks.
          </span>
        </label>
        <textarea
          name="body"
          className="na-input na-textarea"
          placeholder="Full post content…"
          value={form.body}
          onChange={handleChange}
          required
          rows={10}
        />
      </div>

      <div className="na-form-row">
        <div className="na-form-group">
          <label className="na-label">
            Link URL <span className="na-hint">Optional</span>
          </label>
          <input
            name="url"
            className="na-input"
            placeholder="https://…"
            value={form.url}
            onChange={handleChange}
          />
        </div>
        <div className="na-form-group">
          <label className="na-label">Link label</label>
          <input
            name="url_label"
            className="na-input"
            placeholder="Try it free →"
            value={form.url_label}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="na-form-group">
        <label className="na-toggle">
          <input
            type="checkbox"
            name="internal"
            checked={form.internal}
            onChange={handleChange}
          />
          <span>Internal link (use React Router, not external URL)</span>
        </label>
      </div>

      {error && <p className="na-error">{error}</p>}

      <div className="na-form-actions">
        <button type="submit" className="na-btn-primary" disabled={saving}>
          {saving ? "Saving…" : post?.id ? "Update post" : "Publish post"}
        </button>
        <button type="button" className="na-btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

// ── Main admin ────────────────────────────────────────────────────────────────
export default function NewsAdmin() {
  const [authed, setAuthed] = useState(!!getToken());
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = list, 'new' = new form, post = edit form
  const navigate = useNavigate();

  async function fetchPosts() {
    try {
      const { data } = await axios.get(`${ADMIN_API}/api/admin/news`, {
        headers: authHeaders(),
      });
      setPosts(data);
    } catch {
      clearToken();
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) fetchPosts();
  }, [authed]);

  async function handleDelete(id) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    await axios.delete(`${ADMIN_API}/api/admin/news/${id}`, {
      headers: authHeaders(),
    });
    fetchPosts();
  }

  async function handleTogglePublish(post) {
    await axios.put(
      `${ADMIN_API}/api/admin/news/${post.id}`,
      { ...post, published: !post.published },
      { headers: authHeaders() },
    );
    fetchPosts();
  }

  function handleSave() {
    setEditing(null);
    fetchPosts();
  }

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  if (editing)
    return (
      <div className="na-wrap">
        <div className="na-header">
          <h1 className="na-title">
            {editing === "new" ? "New post" : "Edit post"}
          </h1>
          <button className="na-btn-ghost" onClick={() => setEditing(null)}>
            ← Back
          </button>
        </div>
        <PostForm
          post={editing === "new" ? null : editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      </div>
    );

  return (
    <div className="na-wrap">
      <div className="na-header">
        <div>
          <h1 className="na-title">News Admin</h1>
          <p className="na-sub">StackWise · {posts.length} posts</p>
        </div>
        <div className="na-header-actions">
          <button className="na-btn-primary" onClick={() => setEditing("new")}>
            + New post
          </button>
          <button
            className="na-btn-ghost"
            onClick={() => {
              clearToken();
              setAuthed(false);
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      {loading ? (
        <p className="na-loading">Loading…</p>
      ) : (
        <div className="na-posts">
          {posts.length === 0 && (
            <div className="na-empty">
              <p>No posts yet.</p>
              <button
                className="na-btn-primary"
                onClick={() => setEditing("new")}
              >
                Create your first post
              </button>
            </div>
          )}
          {posts.map((post) => (
            <div className="na-post-row" key={post.id}>
              <div className="na-post-info">
                <div className="na-post-meta">
                  <span className={`na-type-badge na-type-${post.type}`}>
                    {post.type}
                  </span>
                  <span
                    className={`na-pub-badge ${post.published ? "published" : "draft"}`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <span className="na-post-date">{post.date}</span>
                </div>
                <h3 className="na-post-title">{post.title}</h3>
                <p className="na-post-summary">{post.summary.slice(0, 120)}…</p>
              </div>
              <div className="na-post-actions">
                <button className="na-btn-sm" onClick={() => setEditing(post)}>
                  Edit
                </button>
                <button
                  className="na-btn-sm ghost"
                  onClick={() => handleTogglePublish(post)}
                >
                  {post.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  className="na-btn-sm danger"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
