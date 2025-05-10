// components/collection/LinkCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LinkCard = ({ title, description, url, user }) => {
  return (
    <div className='col-md-3 col-sm-6 mb-4 d-flex align-items-stretch'>
      <div className='card w-100 shadow-sm d-flex flex-column'>
        <div className='card-body d-flex flex-column text-center flex-grow-1'>
          <h5 className='card-title text-truncate mb-2'>{title}</h5>
          <p className='text-muted small mb-2'>{description}</p>
          {user && (
            <p className='text-muted small mb-3'>
              Added by: {user.nickname || 'Unknown'}
            </p>
          )}
          <div className='mt-auto'>
            <Link
              to={url}
              className='text-primary d-flex justify-content-center align-items-center'
              style={{ textDecoration: 'none' }}
            >
              View Link Info<i className='bi bi-arrow-right ms-2'></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
