import React, { useState } from 'react';
import {
  Form,
  FormInput,
  FormGroup,
  Card,
  CardBody,
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  CardLink,
} from 'shards-react';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  if (isAuthenticated) {
    return <Redirect to='/tests'></Redirect>;
  }

  return (
    <div className='mt-5 col-lg-6 mx-auto'>
      <Card style={{ backgroundColor: '#f9f7f7' }}>
        <CardBody>
          <h3 className='text-center  mb-4'>Student Login</h3>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor='email'>
                <span className='text-primary'>Email</span>
              </label>
              <InputGroup>
                <InputGroupAddon type='prepend'>
                  <InputGroupText>
                    {' '}
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroupText>
                </InputGroupAddon>
                <FormInput
                  type='email'
                  id='email'
                  placeholder='Enter email'
                  name='email'
                  value={email}
                  onChange={(e) => handleChange(e)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup className='mb-4'>
              <label htmlFor='password'>
                <span className='text-primary'>Password</span>
              </label>
              <InputGroup className='mb-2'>
                <InputGroupAddon type='prepend'>
                  <InputGroupText>
                    {' '}
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroupText>
                </InputGroupAddon>
                <FormInput
                  type='password'
                  placeholder='Password'
                  id='password'
                  name='password'
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
              </InputGroup>
            </FormGroup>
            <div className='text-center mb-3'>
              <Button pill theme='primary' type='submit'>
                Login
              </Button>
            </div>
          </Form>
          <h6 className='text-center'>
            Don’t have an account? <br />
            <span style={{ color: 'blue' }}>Ask admin</span>
          </h6>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
