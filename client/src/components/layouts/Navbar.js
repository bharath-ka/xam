import React, { Fragment, useState } from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  Button,
} from 'shards-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading, user } = auth;
  const dispatch = useDispatch();
  const [collapseOpen, setCollapseOpen] = useState(false);
  const logOut = () => {
    dispatch(logout());
  };
  const toggleNavbar = () => {
    setCollapseOpen(!collapseOpen);
  };
  const authLinks = (
    <Fragment>
      <NavItem className='mr-2'>
        <Button pill href='#' active>
          {user && user.name}
        </Button>
      </NavItem>
      <NavItem>
        <Button pill onClick={logOut}>
          Logout
        </Button>
      </NavItem>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <NavItem>
        <Link to='/login'>
          <Button pill>Login</Button>
        </Link>
      </NavItem>
      <NavItem>
        <Link to='/signup'>
          <Button pill>Sign Up</Button>
        </Link>
      </NavItem>
    </Fragment>
  );

  return (
    <Navbar
      type='dark'
      theme='primary'
      expand='md'
      style={{ marginBottom: '20px' }}
    >
      <NavbarBrand>XAM</NavbarBrand>

      <NavbarToggler onClick={toggleNavbar} />

      <Collapse open={collapseOpen} navbar>
        <Nav navbar className='ml-auto'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
