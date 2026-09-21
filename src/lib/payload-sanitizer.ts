/**
 * Isomorphic payload sanitizer for LATAM AEGIS and Security filters.
 * Pure string matching without server-side dependencies.
 */
export function sanitizePayload(text: string): { clean: string; flagged: boolean; reason?: string } {
  if (typeof text !== "string") {
    return { clean: String(text ?? ""), flagged: false };
  }
  const lowercase = text.toLowerCase();
  const hostilePatterns = [
    "<script",
    "javascript:",
    "onload=",
    "onerror=",
    "ignore all previous instructions",
    "ignore previous guidelines",
    "forget your instructions",
    "forget all instructions",
    "reveal your system prompt",
    "system override",
    "drop table",
    "select * from",
    "../",
    "..\\",
    "[system override]",
    "<system>",
    "markdown-injection-bypass",
    "\\u003cscript",
    "\\u002e\\u002e\\u002f",
  ];
  for (const pattern of hostilePatterns) {
    if (lowercase.includes(pattern)) {
      return {
        clean: text.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "[CONTIENE_SCRIPT_VETADO]"),
        flagged: true,
        reason: `Hostile pattern matched: ${pattern}`,
      };
    }
  }
  return { clean: text, flagged: false };
}
