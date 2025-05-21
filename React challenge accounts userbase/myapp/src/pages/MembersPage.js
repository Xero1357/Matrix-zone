import { Link } from 'react-router-dom';

function MembersPage({ users, currentUser }) {
  return (
    <div>
      <h3>Hello, {currentUser ? currentUser.name : 'Guest'}</h3>
      <h2>LinkedIn Members:</h2>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.name} from {user.jobTitle}</p>
          <Link to={`/profile/${user.id}`}>
            <button>View Profile</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MembersPage;
