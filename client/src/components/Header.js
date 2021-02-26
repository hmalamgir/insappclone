import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logOutAction } from '../actions/auth';

const Header = () => {
  const dispatch = useDispatch();

  const authSignIn = useSelector((state) => state.authSignIn);
  const { userInfo } = authSignIn;

  const logout = () => dispatch(logOutAction());

  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='mb-5'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Insta</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {userInfo && userInfo ? (
              <>
                <LinkContainer to='/post/create'>
                  <Nav.Link>Create Post</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/profile'>
                  <Nav.Link>My Profile</Nav.Link>
                </LinkContainer>

                <Nav.Link onClick={logout}>Log Out</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to='/signup'>
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/signin'>
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
