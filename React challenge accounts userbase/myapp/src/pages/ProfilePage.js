import { useParams, useNavigate } from 'react-router-dom';

function ProfilePage({ users, user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedUser = id ? users.find(u => u.id === id) : user;

  if (!selectedUser) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>{selectedUser.name}'s Profile</h2>
      <p>Email: {selectedUser.email}</p>
      <p>Job Title: {selectedUser.jobTitle}</p>
      <button onClick={() => navigate('/members')}>Back to Member List</button>
    </div>
  );
}

export default ProfilePage;
