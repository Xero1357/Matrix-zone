import { Link } from 'react-router-dom';

function MemberList({ members }) {
  return (
    <>
      {members.map(member => (
        <div className="hor" key={member.id}>
          <p>{member.name}</p>
          <Link to={`/profile/${member.id}`}>
            <button>View Profile</button>
          </Link>
        </div>
      ))}
    </>
  );
}

export default MemberList;
