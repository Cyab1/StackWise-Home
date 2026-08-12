const statusStyles = {
  planning: { background: "#F1F5F9", color: "#64748B" },
  active: { background: "var(--sw-pass-bg)", color: "var(--sw-pass)" },
  on_hold: { background: "var(--sw-warn-bg)", color: "var(--sw-warn)" },
  completed: { background: "#EFF6FF", color: "#2563EB" },
  archived: { background: "#F8FAFC", color: "#94A3B8" },
  todo: { background: "#F1F5F9", color: "#64748B" },
  in_progress: { background: "#EFF6FF", color: "#2563EB" },
  in_review: { background: "#F5F3FF", color: "#7C3AED" },
  done: { background: "var(--sw-pass-bg)", color: "var(--sw-pass)" },
};

const priorityStyles = {
  low: { background: "#F1F5F9", color: "#64748B" },
  medium: { background: "var(--sw-warn-bg)", color: "var(--sw-warn)" },
  high: { background: "#FFF7ED", color: "#F97316" },
  critical: { background: "var(--sw-fail-bg)", color: "var(--sw-fail)" },
};

const badgeBase = {
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: "20px",
  fontSize: "11.5px",
  fontWeight: 600,
  whiteSpace: "nowrap",
};

export function StatusBadge({ status }) {
  const style = statusStyles[status] || {
    background: "#F1F5F9",
    color: "#64748B",
  };
  return (
    <span style={{ ...badgeBase, ...style }}>{status?.replace("_", " ")}</span>
  );
}

export function PriorityBadge({ priority }) {
  const style = priorityStyles[priority] || {
    background: "#F1F5F9",
    color: "#64748B",
  };
  return <span style={{ ...badgeBase, ...style }}>{priority}</span>;
}
