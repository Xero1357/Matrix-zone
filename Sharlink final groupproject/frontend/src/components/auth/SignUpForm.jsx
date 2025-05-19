import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await axios.post(
        'http://localhost:2100/api/signup',
        { email, nickname, password },
        { withCredentials: true }
      );
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      console.error('Signup error:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant='danger'>{error}</Alert>}

      <Form.Group className='mb-3' controlId='formUsername'>
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter your nickname'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formConfirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </Form.Group>

      <div className='d-grid mb-3'>
        <Button variant='primary' type='submit'>
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default SignupForm;
