import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signInAction } from '../actions/auth';
import { Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';

const SignIn = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const authSignUp = useSelector((state) => state.authSignUp);
  const { loading, error } = authSignUp;

  // submit handler
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(signInAction(email, password));

    setEmail('');
    setPassword('');
    history.push('/');
  };

  return (
    <>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <Container>
            <h3>SIGN IN</h3>
            {loading && <Spin size='large' />}
            {error && <Alert message={error} type='warning' />}
            <Form onSubmit={onSubmit} className='mb-4'>
              <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>

            <span className='mt-5'>
              New User ? <Link to='/signup'>Sign Up</Link>
            </span>
          </Container>
        </div>
        <div className='col-md-3'></div>
      </div>
    </>
  );
};

export default SignIn;
