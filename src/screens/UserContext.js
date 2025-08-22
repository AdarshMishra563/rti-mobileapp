import React, { createContext, useState } from 'react';
import { Text, View } from 'react-native';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    followers: 0,
    following: 0,
  });

  const [userPosts, setUserPosts] = useState([]);

  const incrementFollowers = () =>
    setUserData((prev) => ({ ...prev, followers: prev.followers + 1 }));

  const incrementFollowing = () =>
    setUserData((prev) => ({ ...prev, following: prev.following + 1 }));

  // This fixes any children that returns any Text/String without the <Text> tag which would otherwise throw an error
  const renderChildren = (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return <Text>{child}</Text>;
    }
    if (Array.isArray(child)) {
      return child.map((c, i) => <React.Fragment key={i}>{renderChildren(c)}</React.Fragment>);
    }
    return child; // already a valid React element
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        incrementFollowers,
        incrementFollowing,
        userPosts,
        setUserPosts,
      }}
    >
      <View style={{ flex: 1 }}>
        {renderChildren(children)}
      </View>
    </UserContext.Provider>
  );
};
