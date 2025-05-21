import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterLoginForm({ users, setUsers, setCurrentUser }) {
  const [registerData, setRegisterData] = useState({});
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const exists = users.find(u => u.email === registerData.email);
    if (exists) return alert('Email already registered');

    const newUser = { ...registerData, id: Date.now().toString() };
    setUsers(prev => [...prev, newUser]);
    alert('Registration successful');
    navigate('/');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    if (user) {
      setCurrentUser(user);
      navigate('/profile');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <input placeholder="Name" onChange={e => setRegisterData({ ...registerData, name: e.target.value })} required />
        <input placeholder="Email" onChange={e => setRegisterData({ ...registerData, email: e.target.value })} required />
        <input placeholder="Password" type="password" onChange={e => setRegisterData({ ...registerData, password: e.target.value })} required />
        <input placeholder="Confirm Password" type="password" required />
        <input placeholder="Job Title" onChange={e => setRegisterData({ ...registerData, jobTitle: e.target.value })} required />
        <button type="submit">Register</button>
      </form>

      <form onSubmit={handleLogin}>
        <input placeholder="Your Email" onChange={e => setLoginData({ ...loginData, email: e.target.value })} required />
        <input placeholder="Your Password" type="password" onChange={e => setLoginData({ ...loginData, password: e.target.value })} required />
        <button type="submit">Login</button>
      </form>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default RegisterLoginForm;
