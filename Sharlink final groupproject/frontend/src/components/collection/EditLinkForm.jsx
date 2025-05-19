import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditLinkForm = () => {
  const { linkId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    collectionId: '',
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState('');

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await axios.get(
          `http://localhost:2100/api/links/${linkId}`,
          {
            withCredentials: true,
          }
        );
        setFormData(res.data);
      } catch (error) {
        console.error(`Error fetching link ${linkId}:`, error);
        alert('Failed to load link. Check console for details.');
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:2100/api/collections');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (linkId) {
      fetchLink();
      fetchCategories();
    }
  }, [linkId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.url.trim()) newErrors.url = 'URL is required';
    if (!formData.collectionId) newErrors.collectionId = 'Category is required';
    return newErrors;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.put(`http://localhost:2100/api/links/${linkId}`, formData, {
        withCredentials: true,
      });
      alert('Link updated successfully!');
      navigate(`/link/${linkId}`);
    } catch (error) {
      console.error(`Error updating link ${linkId}:`, error);
      alert('Failed to update link. Check console for details.');
    }
  };

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <div className='bg-light p-4 rounded h-100 d-flex flex-column justify-content-between'>
            {collectionTitle && (
              <h5 className='mb-3'>Edit link: <strong>{collectionTitle}</strong></h5>
            )}
            <form className='d-flex flex-column gap-3' onSubmit={handleSave}>
              <h5>URL</h5>
              <input
                type='text'
                name='url'
                placeholder='URL'
                value={formData.url}
                onChange={handleChange}
              />
              {errors.url && <div className='text-danger'>{errors.url}</div>}

              <h5>Title</h5>
              <input
                type='text'
                name='title'
                placeholder='Title'
                value={formData.title}
                onChange={handleChange}
              />

              <h5>Description</h5>
              <textarea
                name='description'
                placeholder='Description'
                value={formData.description}
                onChange={handleChange}
              />

              <h5>Category</h5>
              <select
                name='collectionId'
                value={formData.collectionId}
                onChange={handleChange}
              >
                <option value=''>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              {errors.collectionId && (
                <div className='text-danger'>{errors.collectionId}</div>
              )}

              <button type='submit'>Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLinkForm;
