import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TopLinks = () => {
  const [linksData, setLinksData] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axios.get('http://localhost:2100/api/links');
        setLinksData(res.data);
      } catch (err) {
        console.error('Failed to fetch links:', err);
      }
    };
    fetchLinks();
  }, []);

  return (
    <section className='mt-5'>
      <h2 className='text-center mb-4'>Top Links</h2>
      <div className='row justify-content-center'>
        {linksData.length > 0 ? (
          linksData.map((link) => (
            <div
              key={link._id}
              className='col-md-3 col-sm-6 mb-4 d-flex align-items-stretch'
            >
              <div className='card w-100 shadow-sm d-flex flex-column'>
                <div className='card-body d-flex flex-column text-center flex-grow-1'>
                  <h5 className='card-title text-truncate mb-2'>
                    {link.title}
                  </h5>
                  <p className='text-muted small mb-2'>{link.description}</p>
                  <p className='text-muted small mb-3'>
                    Added by: {link.userId?.nickname || 'Unknown'}
                  </p>
                  <div className='mt-auto'>
                    <Link
                      to={`/link/${link._id}`}
                      className='text-primary d-flex justify-content-center align-items-center'
                      style={{ textDecoration: 'none' }}
                    >
                      View Link Info <i className='bi bi-arrow-right ms-2'></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center'>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default TopLinks;
