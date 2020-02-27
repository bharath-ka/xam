import React, { Fragment } from 'react';
import { Button, Nav, Navbar as Navbr } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = () => {
    const auth = useSelector(state => state.auth);
    const { isAuthenticated, loading } = auth;
    const dispatch = useDispatch();
    
    const logOut = () => {
        dispatch(logout());
    }
    
    const authLinks = (
        <Navbr.Text>
            <Button onClick={logOut} variant="outline-light">Logout</Button>
        </Navbr.Text>
    );
    
    const guestLinks = (
        <Navbr.Text>

            <Link to="/login">
                <Button variant="outline-light">Login</Button>
            </Link>
            {' '}
            <Link to="/signup">
                <Button variant="outline-light">SignUp</Button>
            </Link>

        </Navbr.Text>
    );
    
    return (
        <Navbr bg="dark" variant="dark">
            <Link to="/">
                <Navbr.Brand variant="outline-light">XMS</Navbr.Brand>
            </Link>
            <Nav className="ml-auto">
            </Nav>
            {
                !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)
            }
        </Navbr>
    );
}

export default Navbar;
