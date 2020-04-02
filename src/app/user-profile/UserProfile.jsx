/**
 Created by Gray
 using WebStorm at
 23:15 on 23-Feb-20
 */
import React, { useEffect } from 'react';
import { apiUrls } from "../../services";

const UserProfile = () => {
  useEffect(() => {
    axios.get(apiUrls.API.USERS);
  }, []);
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
};
export default UserProfile;
