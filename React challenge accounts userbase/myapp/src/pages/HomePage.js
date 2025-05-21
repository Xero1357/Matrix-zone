import RegisterLoginForm from '../components/RegisterLoginForm';

function HomePage({ users, setUsers, setCurrentUser }) {
  return (
    <div>
      <h1>Welcome to LinkedIn</h1>
      <RegisterLoginForm users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />
    </div>
  );
}

export default HomePage;
