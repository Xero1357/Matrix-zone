import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateNewCollection = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [imageData, setImageData] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setMessage('Only JPG, PNG, or WEBP images are allowed');
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setMessage('Image size must be under 1MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2100/api/collections/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title, coverImage: imageData }),
      });

      if (!response.ok) {
        var errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }

      setMessage('Collection created successfully!');
      setTitle('');
      navigate('/collection');
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Create New Collection</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Cover Image (optional)</label>
          <input
            id="image"
            type="file"
            className="form-control"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Collection</button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default CreateNewCollection;
