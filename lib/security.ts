/**
 * Security utilities for server-side use (API routes).
 * Use when interpolating user input into HTML to prevent XSS in generated emails.
 */

export function escapeHtml(raw: string): string {
  if (typeof raw !== "string") return "";
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Sanitize file name for email attachments: strip path, allow safe chars only. */
export function sanitizeFilename(name: string): string {
  if (typeof name !== "string") return "attachment";
  const basename = name.replace(/^.*[/\\]/, "").trim() || "attachment";
  const safe = basename.replace(/[^a-zA-Z0-9._-]/g, "_");
  return safe.slice(0, 128) || "attachment";
}
