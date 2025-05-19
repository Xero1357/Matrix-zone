import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const LinkPage = () => {
  const { linkId } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [collection, setCollection] = useState(null);
  const [preview, setPreview] = useState(null);

  // Get current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:2100/api/user", {
          withCredentials: true,
        });
        setCurrentUserId(res.data.user._id);
      } catch (err) {
        console.log("Not logged in");
      }
    };
    fetchUser();
  }, []);

  // Get link by ID
  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await axios.get(
          `http://localhost:2100/api/links/${linkId}`
        );
        setLink(res.data);
      } catch (err) {
        console.error("Failed to fetch link:", err);
      }
    };
    fetchLink();
  }, [linkId]);

  // Get collection data
  useEffect(() => {
    if (link && link.collectionId) {
      const fetchCollection = async () => {
        try {
          const res = await axios.get(
            `http://localhost:2100/api/collections/${link.collectionId}`
          );
          setCollection(res.data);
        } catch (err) {
          console.error("Failed to fetch collection:", err);
        }
      };
      fetchCollection();
    }
  }, [link]);

  // Get link preview
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await axios.get(
          `https://api.linkpreview.net/?key=45dfb22080186b8a71a3be0abbce69aa&q=${encodeURIComponent(
            link.url
          )}`
        );
        setPreview(res.data);
      } catch (err) {
        console.error("Failed to fetch link preview:", err);
      }
    };

    if (link && link.url) {
      fetchPreview();
    }
  }, [link]);

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:2100/api/links/${linkId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.error("Failed to delete link:", err);
    }
  };

  if (!link) return <p>Loading link...</p>;

  const isOwner = currentUserId && link.userId === currentUserId;

  return (
    <div className="container mt-4">
      {/* Breadcrumbs */}
      {collection && (
        <div className="d-flex align-items-center mb-4">
          <button className="btn btn-link" onClick={() => navigate("/")}>
            All collections
          </button>
          <span className="mx-2">/</span>
          <button
            className="btn btn-link"
            onClick={() => navigate(`/collection/${collection._id}`)}
          >
            {collection.title}
          </button>
        </div>
      )}

      {/* Link details */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>{link.title}</h1>
          <p>{link.description}</p>
        </div>
        <div className="d-flex gap-2">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Visit Link
          </a>
          {isOwner && (
            <>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate(`/link/${link._id}/edit`)}
              >
                <i className="bi bi-pencil-square me-2"></i> Edit Link
              </button>
              <button className="btn btn-outline-danger" onClick={handleDelete}>
                <i className="bi bi-trash me-2"></i> Delete Link
              </button>
            </>
          )}
        </div>
      </div>

      {/* Link preview card */}
      {preview && (
        <div className="card mt-4" style={{ maxWidth: "500px" }}>
          <img src={preview.image} className="card-img-top" alt="preview" />
          <div className="card-body">
            <h5 className="card-title">{preview.title}</h5>
            <p className="card-text">{preview.description}</p>
            <a
              href={preview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Visit Website
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkPage;
