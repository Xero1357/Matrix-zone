import React from 'react';

const CollectionCard = ({
  title,
  coverImage,
  numberOfLinks,
  description,
  url,
}) => {
  return (
    <div className='col-md-3 col-sm-6 mb-4 d-flex align-items-stretch'>
      <div className='card w-100 shadow-sm'>
        <img
          src={coverImage || 'https://via.placeholder.com/400x200'}
          className='card-img-top'
          alt={title}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <div className='card-body d-flex flex-column text-center'>
          <h5
            className='card-title text-truncate mb-2'
            style={{ minHeight: '60px', lineHeight: '1.2' }}
          >
            {title}
          </h5>
          <p className='text-muted small mb-3' style={{ flexGrow: 1 }}>
            {description || 'No description available'}
          </p>
          <p className='text-muted mb-3' style={{ fontSize: '0.875rem' }}>
            {numberOfLinks} links
          </p>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary d-flex justify-content-center align-items-center'
            style={{ textDecoration: 'none' }}
          >
            View Collection
            <i className='bi bi-arrow-right ms-2'></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
