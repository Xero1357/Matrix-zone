import './styles/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MembersPage from './pages/MembersPage';
import ProfilePage from './pages/ProfilePage';
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />} />
        <Route path="/members" element={<MembersPage users={users} currentUser={currentUser} />} />
        <Route path="/profile" element={<ProfilePage user={currentUser} />} />
        <Route path="/profile/:id" element={<ProfilePage users={users} />} />
      </Routes>
    </Router>
  );
}

export default App;
