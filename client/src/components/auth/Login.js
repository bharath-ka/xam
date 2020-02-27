import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Login = ({ isAuthenticated, login }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;

    const handleChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        login({ email, password });
    }
    if (isAuthenticated) {
        return <Redirect to='/tests'></Redirect>
    }


    return (
        <Container className='jumbotron' style={{ marginTop: "20px" }}>
            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={e => handleChange(e)} />
                    <Form.Text className="text-muted">
                        Enter the creds ,what are you waiting for nigga!!
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={e => handleChange(e)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
             </Button>
            </Form>
        </Container>

    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStatetoProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatetoProps, { login })(Login);
