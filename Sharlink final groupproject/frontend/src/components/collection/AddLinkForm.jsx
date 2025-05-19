import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const AddLinkForm = ({ onSuccess }) => {
  const { collectionId } = useParams();

  const [collectionTitle, setCollectionTitle] = useState('');
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    collectionId: '',
  });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:2100/api/collections');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (collectionId) {
      setFormData((prev) => ({ ...prev, collectionId }));
      axios
        .get(`http://localhost:2100/api/collections/${collectionId}`)
        .then((res) => setCollectionTitle(res.data.title))
        .catch((err) => console.error('Error fetching collection title:', err));
    }
  }, [collectionId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      var newLink = await axios.post('http://localhost:2100/api/links', formData, {
        withCredentials: true,
      });
      alert('Link added successfully!');
      setFormData({ url: '', title: '', description: '', collectionId: '' });
      setErrors({});
      if (onSuccess) {
        onSuccess(formData.collectionId);
      }
      navigate(`/link/${newLink.data._id}`);
    } catch (error) {
      console.error('Error adding link:', error);
      alert('Failed to add link. Check console for details.');
    }
  };

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <div className='bg-light p-4 rounded h-100 d-flex flex-column justify-content-between'>
            {collectionTitle && (
              <h5 className='mb-3'>Add new link: <strong>{collectionTitle}</strong></h5>
            )}
            <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
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

              <button type='submit'>Add Link</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLinkForm;
