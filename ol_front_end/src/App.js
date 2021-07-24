import './App.css';
import { Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { oktaAuthConfig } from './app.config';
import { useHistory } from 'react-router-dom';

import Nevbar from './components/app/Nevbar';

function App() {
  const history = useHistory();

  const oktaAuth = new OktaAuth(oktaAuthConfig);

  const customAuthHandler = () => {
    history.push('/');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <div className='App'>
        <Nevbar />
      </div>
    </Security>
  );
}

export default App;
