import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CollectionCard from "../components/collection/CollectionCard";

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchCollections = async () => {
    try {
      const res = await axios.get("http://localhost:2100/api/my-collections", {
        withCredentials: true,
      });
      setCollections(res.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading your collections...</p>;
  }

  if (!isLoggedIn) {
    return (
      <p className="text-center mt-8">
        Please log in to view your collections.
      </p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="text-2xl font-bold">My Collections</h2>
          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={() => navigate("/collection/add-link")}
            >
              + Add new link
            </button>
            <button
              className="btn btn-success"
              onClick={() => navigate("/collections/new")}
            >
              + Add new collection
            </button>
          </div>
        </div>
        {collections.length > 0 ? (
          <div className="row justify-content-center">
            {collections.map((collection) => (
              <CollectionCard
                key={collection._id}
                title={collection.title}
                coverImage={
                  collection.coverImage || "https://picsum.photos/300/180"
                }
                linkCount={collection.linkIds?.length || 0}
                onClick={() => navigate(`/collection/${collection._id}`)}
              />
            ))}
          </div>
        ) : (
          <p>You have no collections yet.</p>
        )}
      </main>
    </div>
  );
};

export default CollectionsPage;
