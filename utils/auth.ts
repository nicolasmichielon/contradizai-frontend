export function getUsernameFromToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const [, payloadBase64] = token.split(".");
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson) as { username?: string };
    return payload.username ?? null;
  } catch (err) {
    console.error("Failed to decode token payload:", err);
    return null;
  }
}


export function getUserIdFromToken(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // Ajuste para o campo correto
    return payload.userId || payload.sub || null;
  } catch {
    return null;
  }
}

