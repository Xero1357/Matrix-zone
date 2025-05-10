import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:2100/api/logout', {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <Navbar bg='light' expand='md' className='px-4 py-3'>
      <Container>
        <Navbar.Brand
          as={Link}
          to='/'
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800' }}
        >
          SharLinks <i className='bi bi-share' />
        </Navbar.Brand>

        <Nav className='ms-auto d-flex gap-3'>
          {isLoggedIn && (
            <>
              <Nav.Link as={Link} to='/profile'>
                <i className='bi bi-person-circle me-1' />
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to='/collection'>
                My Collections
              </Nav.Link>
            </>
          )}
          <Nav.Link as={Link} to='/ai-search'>
            <i className='bi bi-brain' /> AI Search
          </Nav.Link>
          {isLoggedIn ? (
            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <i className='bi bi-box-arrow-right me-1' />
              Log Out
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to='/login'>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to='/signup'>
                Sign Up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
