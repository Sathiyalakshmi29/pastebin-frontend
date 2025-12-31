// api.js
const BASE_URL = "http://localhost:5000/api/pastes"; // change to deployed URL when live

export async function getPastes() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch pastes");
  }
  const json = await res.json();
  return json.data || [];
}

export async function createPaste(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create paste");
  }

  const json = await res.json();
  return json.data; // must return {id, url}
}

const API_BASE = "http://localhost:5000";

export async function getPasteById(id) {
  const res = await fetch(`${API_BASE}/api/pastes/${id}`);
  if (!res.ok) throw new Error("Paste not found");
  return await res.json();
}









