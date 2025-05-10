

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCollection = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await axios.get(`http://localhost:2100/api/collections/${collectionId}`, { withCredentials: true });
        setTitle(res.data.title || '');
      } catch (err) {
        console.error(err);
        setError('Failed to fetch collection details');
      }
    };
    fetchCollection();
  }, [collectionId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 2 * 1024 * 1024 && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select an image under 2MB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2100/api/collections/${collectionId}`, {
        title,
        coverImage,
      }, {
        withCredentials: true,
      });
      navigate(`/collection/${collectionId}`);
    } catch (err) {
      console.error(err);
      setError('Failed to update collection');
    }
  };

  return (
    <div className="container py-4">
      <h2>Edit Collection</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cover Image (optional)</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Collection</button>
      </form>
    </div>
  );
};

export default EditCollection;