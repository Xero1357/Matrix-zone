import React, { useEffect, useState } from "react";
import axios from "axios";
import UserInfo from "../components/profile/UserInfo";
import CollectionList from "../components/profile/CollectionList";

const ProfilePage = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:2100/api/user", {
          withCredentials: true,
        });
        setUser({
          username: res.data.user.nickname,
          email: res.data.user.email,
        });
        setIsAuthenticated(true);
      } catch (err) {
        console.error("User fetch failed", err);
        setIsAuthenticated(false);
      }
    };

    // Call both inside useEffect
    fetchUserData();
  }, []); // ← this was not closed

  if (isAuthenticated === null) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-10">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-8">
          <UserInfo username={user.username} email={user.email} />
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
