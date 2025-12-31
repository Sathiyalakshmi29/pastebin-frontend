// Home.jsx
import { useEffect, useState } from "react";
import "./Home.css";
import "./App.css";
import { getPastes, createPaste } from "./api";

function Home() {
  const [pastes, setPastes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadPastes();
  }, []);

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      : "N/A";

  async function loadPastes() {
    try {
      const data = await getPastes();
      setPastes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setPastes([]);
    }
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    const payload = { content, title };
    if (ttl && Number(ttl) >= 1) payload.ttl_seconds = Number(ttl);

    try {
      const res = await createPaste(payload);

      // ✅ THIS NOW WORKS
      alert(`Shareable URL: ${res.url}`);

      await loadPastes();

      setTitle("");
      setContent("");
      setTtl("");
    } catch (err) {
      setError(err.message);
    }
  }


  return (
    <div className="app-container">
      <div className="card">
        <div className="header">
          <h1>Pastebin Lite</h1>
          <p>Store and share text snippets securely</p>
        </div>

        {error && <p className="error">{error}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea"
            placeholder="Paste content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            className="input"
            placeholder="TTL in seconds (optional)"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
          />
          <button className="button" type="submit">
            Create Paste
          </button>
        </form>

        {/* Paste List */}
        <div className="paste-list">
          {pastes.length === 0 ? (
            <p>No pastes yet</p>
          ) : (
            pastes.map((p) => (
              <div key={p._id} className="paste-card">
                <h3>{p.title || "Untitled"}</h3>
                <pre>{p.content}</pre>
                <div>
                  <a
                    href={`/p/${p._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Shareable Link
                  </a>
                </div>
                <div>
                  {p.expires_at && (
                    <span>Expires: {formatDate(p.expires_at)}</span>
                  )}
                  {p.remaining_views !== null ? (
                    <span> | Remaining views: {p.remaining_views}</span>
                  ) : (
                    <span> | Unlimited views</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;



