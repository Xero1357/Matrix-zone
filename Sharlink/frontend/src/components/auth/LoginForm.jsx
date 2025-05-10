import { useAuth } from '../auth/AuthContext';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { fetchUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(
        'http://localhost:2100/api/login',
        { email, password },
        { withCredentials: true }
      );
      await fetchUser();
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.error('Login error:', err);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      {error && <Alert variant='danger'>{error}</Alert>}

      <Form.Group className='mb-3' controlId='formEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <div className='d-grid mb-3'>
        <Button variant='primary' type='submit'>
          Login
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
