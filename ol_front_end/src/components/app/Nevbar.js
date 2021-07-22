import { useState } from 'react';
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Profile from './Profile';
import Home from './Home';

const Nevbar = () => {
  const [showlogout, setShowlogout] = useState(true);

  const logoutButton = () => {
    return <Button variant='outline-info'>logout</Button>;
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
              <Form inline>{logoutButton()}</Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Router>
        <Switch>
          <Route path='/profile'>
            <Profile />
          </Route>

          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Nevbar;
