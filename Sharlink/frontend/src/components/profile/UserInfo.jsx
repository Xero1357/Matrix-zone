import React from "react";
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

const UserInfo = ({ username, email }) => {
  return (
    <div className="p-6 bg-gray-50 border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaUser className="text-blue-600" />
        Profile Info
      </h2>

      <div className="space-y-2 text-gray-800">
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
