// // src/screens/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    followers: 0,
    following: 0,
  });

  const [userPosts, setUserPosts] = useState([]); // ✅ add posts state

  const incrementFollowers = () =>
    setUserData((prev) => ({ ...prev, followers: prev.followers + 1 }));

  const incrementFollowing = () =>
    setUserData((prev) => ({ ...prev, following: prev.following + 1 }));

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        incrementFollowers,
        incrementFollowing,
        userPosts,       // ✅ expose posts
        setUserPosts,    // ✅ expose setter
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
