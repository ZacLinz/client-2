import React, { useState } from 'react';
import axios from 'axios';
//import PropTypes from 'prop-types';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword , setConfirmPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://my-movie-108.herokuapp.com/users', {
        username: username,
        email: email,
        birthday: birthday,
        password: password,
        confirmPassword: confirmPassword
    })
    .then(response =>{
      const data = response.data;
      console.log(data);
      window.location.assign('/');
    })
    .catch(e => {
      console.log('error registering the user')
    });
  }

  return(
<Form>
  <Form.Group controlId="formBasicUsername">
    <Form.Label>Username</Form.Label>
    <Form.Control type="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email Address</Form.Label>
    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter valid Email" />
  </Form.Group>
  <Form.Group controlId="formBasicBirthday">
    <Form.Label>Birthday</Form.Label>
    <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="yyyy-mm-dd" />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicConfirmPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter Password" />
  </Form.Group>
  <Button className="submit" onClick={handleSubmit}
  disabled={!username || !email || !password.includes(confirmPassword) || password !== confirmPassword}>
    Register
  </Button>
</Form>
  );
}
