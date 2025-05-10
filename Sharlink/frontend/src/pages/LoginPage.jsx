import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <div
        className='w-100'
        style={{
          maxWidth: '320px',
          width: '100%',
        }}
      >
        <h4 className='text-center mb-4 mt-5'>Login to SharLinks</h4>
        <LoginForm />
        <div className='text-center mt-3'>
          <small>
            Don't have an account? <Link to='/signup'>Sign Up</Link>
          </small>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
