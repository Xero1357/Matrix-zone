import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import LinkCard from '../components/collection/LinkCard';
import { useAuth } from '../components/auth/AuthContext';

const OneCollectionPage = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [collection, setCollection] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await axios.get(
          `http://localhost:2100/api/collections/${collectionId}`
        );
        setCollection(res.data);
      } catch (err) {
        console.error('Failed to fetch collection:', err);
      }
    };

    const fetchLinks = async () => {
      try {
        const res = await axios.get(`http://localhost:2100/api/links`);
        const filteredLinks = res.data.filter(
          (link) =>
            link.collectionId === collectionId || link.collectionId?._id === collectionId
        );
        setLinks(filteredLinks);
      } catch (err) {
        console.error('Failed to fetch links:', err);
      }
    };

    fetchCollection();
    fetchLinks();
  }, [collectionId]);

  if (!collection) return <p>Loading collection...</p>;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this collection?')) return;

    try {
      await axios.delete(`http://localhost:2100/api/collections/${collectionId}`, {
        withCredentials: true,
      });
      navigate('/collection');
    } catch (err) {
      console.error('Failed to delete collection:', err);
      alert('Failed to delete collection');
    }
  };

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1 className='mb-0'>{collection.title}</h1>
        <div className='d-flex gap-2'>
          {user?._id === collection.userId && (
            <>
              <button
                onClick={handleDelete}
                className='btn btn-danger'
              >
                Delete
              </button>
              <a
                href={`/collection/${collectionId}/edit`}
                className='btn btn-secondary'
              >
                Edit
              </a>
            </>
          )}
          <a
            href={`/collection/${collectionId}/add-link`}
            className='btn btn-primary'
          >
            + New Link
          </a>
        </div>
      </div>
      <p className='text-center'>{collection.description}</p>

      <h2 className='mt-5 mb-5'>Links in this Collection:</h2>
      <div className='row justify-content-center'>
        {links.length > 0 ? (
          links.map((link) => (
            <LinkCard
              key={link._id}
              title={link.title}
              description={link.description}
              url={`/link/${link._id}`}
            />
          ))
        ) : (
          <p className='text-center'>No links in this collection.</p>
        )}
      </div>
    </div>
  );
};

export default OneCollectionPage;
