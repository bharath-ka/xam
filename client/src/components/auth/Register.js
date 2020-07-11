import React, { useState } from 'react';
import {
    Form, FormInput, FormGroup, Card, CardBody, Button, InputGroup,
    InputGroupText,
    InputGroupAddon,
    CardLink,
    Row,
    Col,
    FormSelect,
} from "shards-react";
import { faUser, faLock, faAt, faUserTag, faUniversity, faSchool } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
const Register = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

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
            dispatch(setAlert("Passwords donot match", 'danger'));
        else {
            dispatch(register({ name, email, password, role, branch_id, section_id }));
        }

    }
    // if (isAuthenticated) {
    //     return <Redirect to='/tests' ></Redirect>
    // }

    return (
        <div className="mt-5 col-lg-8 mx-auto">
            <h3 className="text-center">Register</h3>
            <Card style={{ backgroundColor: "#f9f7f7" }}>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <label htmlFor="name"><span className="">Name</span></label>
                                    <InputGroup seamless>
                                        <InputGroupAddon type="prepend">
                                            <InputGroupText> <FontAwesomeIcon icon={faUser} /></InputGroupText>
                                        </InputGroupAddon>
                                        <FormInput
                                            id="name"
                                            type='text'
                                            placeholder="Enter name"
                                            name='name'
                                            value={name}
                                            onChange={e => handleChange(e)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label htmlFor="email"><span className="">Email</span></label>
                                    <InputGroup seamless>
                                        <FormInput
                                            id="email"
                                            type="email"
                                            placeholder="Enter email"
                                            name='email'
                                            value={email}
                                            onChange={e => handleChange(e)}
                                        />
                                        <InputGroupAddon type="append">
                                            <InputGroupText> <FontAwesomeIcon icon={faAt} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <label htmlFor="role"><span className="">Role</span></label>
                                    <InputGroup seamless>
                                        <InputGroupAddon type="prepend">
                                            <InputGroupText> <FontAwesomeIcon icon={faUserTag} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <FormSelect
                                            id='role'
                                            name='role'
                                            onChange={e => handleChange(e)}
                                            value={role}>
                                            <option value="" >
                                                Choose a Role
                                            </option>
                                            <option value="faculty">Faculty</option>
                                            <option value="student">Student</option>
                                        </FormSelect>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label htmlFor="branch_id"><span className="">Branch</span></label>
                                    <InputGroup seamless>
                                        <InputGroupAddon type="prepend">
                                            <InputGroupText> <FontAwesomeIcon icon={faUniversity} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <FormSelect
                                            id="section_id"
                                            name='branch_id'
                                            onChange={e => handleChange(e)}
                                            value={branch_id}
                                        >
                                            <option value="">
                                                Choose a Branch
                                            </option>
                                            <option value="5e38f67588673563d60c5f38">ISE</option>
                                            {/* <option value="">CSE</option> */}

                                        </FormSelect>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <label htmlFor="section_id"><span className="">Section</span></label>
                                    <InputGroup seamless>
                                        <InputGroupAddon type="prepend">
                                            <InputGroupText> <FontAwesomeIcon icon={faSchool} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <FormSelect
                                            id="section_id"
                                            name='section_id'
                                            onChange={e => handleChange(e)}
                                            value={section_id}>
                                            <option value="">
                                                Choose a Section
                                            </option>
                                            <option value="5e38f7394e845663f7f18112">A</option>
                                            <option value="5e38f7394e845663f7f18112">B</option>
                                        </FormSelect>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <FormGroup >
                                    <label htmlFor="password"><span className="">Password</span></label>
                                    <InputGroup seamless>
                                        <InputGroupAddon type="prepend">
                                            <InputGroupText> <FontAwesomeIcon icon={faLock} /></InputGroupText>
                                        </InputGroupAddon>
                                        <FormInput
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            name='password'
                                            value={password}
                                            onChange={e => handleChange(e)} />
                                    </InputGroup>
                                </FormGroup></Col>
                            <Col>
                                <FormGroup>
                                    <label htmlFor="password1"><span className="">Confirm Password</span></label>
                                    <InputGroup seamless>
                                        <FormInput
                                            id="password1"
                                            type="password"
                                            placeholder="Confirm Password"
                                            name='password1'
                                            value={password1}
                                            onChange={e => handleChange(e)} />
                                        <InputGroupAddon type="append">
                                            <InputGroupText> <FontAwesomeIcon icon={faLock} /></InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <div className="text-center mb-3">
                            <Button block pill theme="primary" >
                                Register
                            </Button>
                        </div>
                    </Form>
                    {/* <h6 className="text-center">Already have an account? <CardLink href="#" className="card-link">login</CardLink> </h6> */}
                </CardBody>
            </Card>
        </div>
    )
}

export default Register;
