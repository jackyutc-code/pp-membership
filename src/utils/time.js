export function formatClock(d) {
  try {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } catch {
    return d.toISOString();
  }
}

export function formatDate(d) {
  try {
    return d.toLocaleDateString([], { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return d.toISOString().slice(0, 10);
  }
}
