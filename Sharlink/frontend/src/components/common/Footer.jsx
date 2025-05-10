import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='bg-light text-center text-muted py-4 mt-auto'>
      <Container>
        <div>
          2025 &copy;{' '}
          <a
            href='https://github.com/Dariaengin/Sharlink'
            target='_blank'
            rel='noreferrer'
            className='text-decoration-none'
          >
            SharLinks
          </a>{' '}
          project developed by Matrix Master Bootcamp Group-18 Team-2
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
