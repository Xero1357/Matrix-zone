import React from "react";

const CollectionCard = ({ title, coverImage, linkCount, onClick }) => {
  return (
    <div
      className="col-md-3 col-sm-6 mb-4 d-flex align-items-stretch"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <div className="card w-100 shadow-sm">
        <img
          src={coverImage}
          className="card-img-top"
          alt={title}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column text-center">
          <h5
            className="card-title text-truncate mb-2"
            style={{ minHeight: "60px", lineHeight: "1.2" }}
          >
            {title}
          </h5>
          <p className="text-muted small mb-0">{linkCount} links</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
