/**
 Created by Gray
 using WebStorm at
 23:15 on 23-Feb-20
 */
import React, { useEffect } from 'react';

const UserProfile = () => {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    axios.get('http://localhost:8000/api/users');
  }, []);
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
};
export default UserProfile;
