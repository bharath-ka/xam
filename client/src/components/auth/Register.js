import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container } from 'react-bootstrap';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: '',
        password1: '',
        role: '',
        section_id: '',
        branch_id: ''
    });
    const { name, email, password, password1, role, branch_id, section_id } = formData;
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password1)
            setAlert("Passwords donot match", 'danger');
        else {
            register({ name, email, password, role, branch_id, section_id });
        }

    }
    if (isAuthenticated) {
        return <Redirect to='/tests' ></Redirect>
    }

    return (
        <Container className="jumbotron" style={{ marginTop: "50px" }}>
            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Enter name"
                        name='name'
                        value={name}
                        onChange={e => handleChange(e)} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name='email'
                        value={email}
                        onChange={e => handleChange(e)} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select"
                        name='role'
                        onChange={e => handleChange(e)}
                        value={role}>
                        <option >Choose a role</option>
                        <option value="faculty">Faculty</option>
                        <option value="student">Student</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group >
                    <Form.Label>Branch</Form.Label>
                    <Form.Control as="select"
                        name='branch_id'
                        onChange={e => handleChange(e)}
                        value={branch_id}>
                        <option >Choose a Branch</option>
                        <option value="5e38f67588673563d60c5f38">ISE</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group >
                    <Form.Label>Section</Form.Label>
                    <Form.Control as="select"
                        name='section_id'
                        onChange={e => handleChange(e)}
                        value={section_id}>
                        <option >Choose a Section</option>
                        <option value="5e38f7394e845663f7f18112">A</option>
                        <option value="5e38f7414e845663f7f18113">B</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name='password'
                        value={password}
                        onChange={e => handleChange(e)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name='password1'
                        value={password1}
                        onChange={e => handleChange(e)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStatesToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStatesToProps, { setAlert, register })(Register);
