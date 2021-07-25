import { useOktaAuth } from '@okta/okta-react';
import { getUserInfo } from '../../lib/api';
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const oktaTokenObj = oktaAuth.authStateManager._authState.accessToken;
    getUserInfo(oktaTokenObj).then((response) => {
      setUserInfo(response.data.profile);
    });
  }, [authState, oktaAuth]);

  const showUserInfo = (info) => {
    return (
      <div className='text-align mt-5'>
        <h4>First name: {info.firstName}</h4>
        <h4>Last name: {info.lastName}</h4>
        <h4>email: {info.email}</h4>
      </div>
    );
  };

  return (
    <>
      <h1>Profile</h1>
      {!userInfo && <h1 className='mt-5'>Loading...</h1>}
      {userInfo && showUserInfo(userInfo)}
    </>
  );
};

export default Profile;
