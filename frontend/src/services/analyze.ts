import type { AnalyzeResult } from "@/types";

const DEFAULT_API_BASE = "http://localhost:8000";

function getApiBase(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  const base =
    typeof raw === "string" && raw.trim() !== ""
      ? raw.trim().replace(/\/$/, "")
      : DEFAULT_API_BASE;
  return base;
}

function parseErrorBody(data: unknown, status: number): string {
  if (typeof data !== "object" || data === null || !("detail" in data)) {
    return `Request failed (${status})`;
  }
  const detail = (data as { detail: unknown }).detail;
  if (typeof detail === "string") {
    return detail;
  }
  if (Array.isArray(detail)) {
    const parts = detail
      .map((item) => {
        if (typeof item === "object" && item !== null && "msg" in item) {
          return String((item as { msg: unknown }).msg);
        }
        return null;
      })
      .filter((s): s is string => Boolean(s));
    if (parts.length > 0) {
      return parts.join("; ");
    }
  }
  return `Request failed (${status})`;
}

export type AnalyzeInput = {
  /** Product page URL; optional if imageBase64 is set */
  productUrl?: string;
  /** Raw base64 or data:image/...;base64,... from FileReader */
  imageBase64?: string | null;
};

/**
 * POST http://localhost:8000/analyze (override base with VITE_API_BASE_URL).
 * Send product_url and/or image_base64 (at least one required by API).
 */
export async function analyzeProduct(input: AnalyzeInput): Promise<AnalyzeResult> {
  const endpoint = `${getApiBase()}/analyze`;
  const body = {
    product_url: (input.productUrl ?? "").trim(),
    image_base64: input.imageBase64 ?? null,
  };

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    const base = getApiBase();
    const reason = err instanceof Error ? err.message : "Unknown error";
    throw new Error(
      `Could not reach the API at ${base}. ${reason} Start the backend (e.g. uvicorn on port 8000) and try again.`
    );
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error(
      `The server returned an invalid response (HTTP ${res.status}).`
    );
  }

  if (!res.ok) {
    throw new Error(parseErrorBody(data, res.status));
  }

  return data as AnalyzeResult;
}
