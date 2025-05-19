import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';

const SignupPage = () => {
  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <div className='w-100' style={{ maxWidth: '360px' }}>
        <h4 className='text-center mb-4 mt-5'>Create your SharLinks account</h4>
        <SignupForm />
        <div className='text-center mt-3'>
          <small>
            Already have an account? <Link to='/login'>Login</Link>
          </small>
        </div>
      </div>
    </Container>
  );
};

export default SignupPage;
