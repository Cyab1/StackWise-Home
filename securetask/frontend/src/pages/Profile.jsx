import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import useAuthStore from "../store/authStore";
import api from "../api/axios";

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

export default function Profile() {
  const { user, setUser } = useAuthStore();
  const [form, setForm] = useState({ username: "", bio: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) setForm({ username: user.username || "", bio: user.bio || "" });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const { data } = await api.patch("/auth/profile/", form);
      setUser(data);
      setSuccess(true);
    } catch {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const initial = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <AppLayout>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ padding: "28px 32px 0" }}>
          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--sw-text)",
            }}
          >
            Profile
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--sw-text-muted)",
              marginTop: "2px",
            }}
          >
            Manage your account and preferences
          </p>
        </div>

        <div
          style={{
            padding: "24px 32px 40px",
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "20px",
          }}
        >
          {/* User card */}
          <div
            style={{
              background: "var(--sw-white)",
              border: "1.5px solid var(--sw-border)",
              borderRadius: "10px",
              padding: "28px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "var(--sw-dark)",
                  border: "3px solid var(--sw-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "26px",
                  color: "var(--sw-teal)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {initial}
              </div>
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "var(--sw-text)",
              }}
            >
              {user?.username}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--sw-text-muted)",
                marginTop: "2px",
              }}
            >
              {user?.email}
            </div>
            {user?.bio && (
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--sw-text-muted)",
                  marginTop: "12px",
                  lineHeight: 1.5,
                }}
              >
                {user.bio}
              </div>
            )}
            <div
              style={{
                fontSize: "12px",
                color: "var(--sw-text-muted)",
                marginTop: "14px",
                paddingTop: "14px",
                borderTop: "1px solid var(--sw-border)",
              }}
            >
              Member of SecureTask
            </div>
          </div>

          {/* Edit form */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                background: "var(--sw-white)",
                border: "1.5px solid var(--sw-border)",
                borderRadius: "10px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "var(--sw-text)",
                  marginBottom: "18px",
                }}
              >
                Personal Information
              </div>

              {success && (
                <div
                  style={{
                    background: "var(--sw-pass-bg)",
                    color: "var(--sw-pass)",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    marginBottom: "16px",
                    border: "1px solid var(--sw-border)",
                  }}
                >
                  Profile updated successfully
                </div>
              )}
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "12.5px",
                        fontWeight: 600,
                        color: "var(--sw-text-muted)",
                      }}
                    >
                      Username
                    </label>
                    <input
                      style={inputStyle}
                      value={form.username}
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
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
                      style={{
                        ...inputStyle,
                        opacity: 0.6,
                        cursor: "not-allowed",
                      }}
                      value={user?.email || ""}
                      disabled
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 600,
                      color: "var(--sw-text-muted)",
                    }}
                  >
                    Bio
                  </label>
                  <textarea
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "80px",
                    }}
                    placeholder="Tell your team about yourself…"
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "8px 20px",
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
                    {loading ? "Saving…" : "Save changes"}
                  </button>
                </div>
              </form>
            </div>

            {/* Danger zone */}
            <div
              style={{
                background: "var(--sw-white)",
                border: "1.5px solid #fca5a5",
                borderRadius: "10px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "var(--sw-fail)",
                  marginBottom: "8px",
                }}
              >
                Danger Zone
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--sw-text-muted)",
                  marginBottom: "14px",
                }}
              >
                Permanently delete your account and all associated data. This
                cannot be undone.
              </p>
              <button
                style={{
                  padding: "7px 14px",
                  borderRadius: "6px",
                  border: "1.5px solid #fca5a5",
                  background: "var(--sw-fail-bg)",
                  color: "var(--sw-fail)",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "13px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
