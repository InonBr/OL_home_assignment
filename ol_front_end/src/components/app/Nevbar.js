import { useState } from 'react';
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SecureRoute } from '@okta/okta-react';
import { oktaSignInConfig } from '../../app.config';
import { useOktaAuth } from '@okta/okta-react';

import Profile from './Profile';
import Home from './Home';
import Login from './Login';
import ModalComponent from './ModalComponent';

const Nevbar = () => {
  const [showlogout, setShowlogout] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState('');
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) return null;

  const logout = async () => {
    oktaAuth.tokenManager.clear();
    window.location = '/';
  };

  const closeModal = () => {
    setShowModal(false);
    setModalForm('');
  };

  const loginClick = () => {
    window.location = '/login';
  };

  const registerClick = () => {
    setShowModal(true);
    setModalForm('register');
  };

  const registerAndLoginButtons = () => {
    return (
      <>
        <Form>
          <Button
            className='m-1'
            variant='outline-info'
            onClick={() => {
              loginClick();
            }}
          >
            Login
          </Button>
        </Form>

        <Form>
          <Button
            className='m-1'
            variant='outline-info'
            onClick={() => {
              registerClick();
            }}
          >
            Join Us!
          </Button>
        </Form>
      </>
    );
  };

  const logoutButton = () => {
    return (
      <Button
        className='m-1'
        variant='outline-info'
        onClick={() => {
          logout();
        }}
      >
        logout
      </Button>
    );
  };

  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link exact='true' className='link' href='/'>
                Home
              </Nav.Link>
              <Nav.Link exact='true' className='link' href='/profile'>
                Profile
              </Nav.Link>
            </Nav>

            <Nav>
              {!authState.isAuthenticated && registerAndLoginButtons()}
              <Form>{authState.isAuthenticated && logoutButton()}</Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Router>
        <Switch>
          <SecureRoute path='/profile'>
            <Profile />
          </SecureRoute>

          <Route
            path='/login'
            render={() => <Login config={oktaSignInConfig} />}
          />

          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>

      <ModalComponent
        showModal={showModal}
        modalForm={modalForm}
        closeFunc={closeModal}
      />
    </>
  );
};

export default Nevbar;
