// PasteView.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPasteById } from "./api";

export default function PasteView() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPaste() {
      try {
        const data = await getPasteById(id);
        setPaste(data);
      } catch {
        setError("Paste not found or expired");
      }
    }
    fetchPaste();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!paste) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h2>Paste</h2>

      <pre
        style={{
          background: "#020617",
          color: "#e5e7eb",
          padding: "20px",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
        }}
      >
        {paste.content}
      </pre>

      <div style={{ marginTop: "15px" }}>
        <div>
          Expires:{" "}
          {paste.expires_at
            ? new Date(paste.expires_at).toLocaleString()
            : "No expiry"}
        </div>

        <div>
          {paste.remaining_views !== null
            ? `Remaining views: ${paste.remaining_views}`
            : "Unlimited views"}
        </div>
      </div>
    </div>
  );
}


