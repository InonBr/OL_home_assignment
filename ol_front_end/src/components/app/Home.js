import { useOktaAuth } from '@okta/okta-react';

const Home = () => {
  const { authState } = useOktaAuth();

  const loginMessage = () => {
    return (
      <h3 className='mt-5'>Please log in in order to access profile page...</h3>
    );
  };

  const profileMessage = () => {
    return <h3 className='mt-5'>You can now go to profile page</h3>;
  };

  return (
    <>
      <h1 className='mt-5'>Home</h1>
      {!authState.isAuthenticated && loginMessage()}
      {authState.isAuthenticated && profileMessage()}
    </>
  );
};

export default Home;
