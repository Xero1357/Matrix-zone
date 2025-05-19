import React, { useState } from "react";
import axios from "axios";

const AISearch = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [similarLinks, setSimilarLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!inputUrl.trim()) return;

    setLoading(true);
    setError("");
    setSimilarLinks([]);

    try {
      const res = await axios.post("http://localhost:2100/api/ai-search", {
        url: inputUrl,
      });
      console.log("Response from API:", res.data);

      setSimilarLinks(res.data.similarLinks || []);
    } catch (err) {
      console.error("AI Search failed", err);
      setError("Failed to fetch similar links. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">🔎 AI Similar Link Finder</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Paste a link here..."
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Find Similar Links"}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {similarLinks.length > 0 && (
        <ul className="list-group">
          {similarLinks.map((link, index) => (
            <li key={index} className="list-group-item">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AISearch;
