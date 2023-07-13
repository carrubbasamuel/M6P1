import React, { useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../redux/reducers/LoginSlice';
import './login.css';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mail = useRef(null);
  const password = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = {
        email: mail.current.value,
        password: password.current.value
      };
      dispatch(fetchLogin(user)).then((res) => {
        const { statusCode } = res.payload;
        if (statusCode === 200) {
          navigate('/');
        } else {
          alert('Email o Password errati');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-root">
      <Container>
        <Row className="justify-content-center align-items-center vh-100">
          <Col md={6}>
            <div className="login-form">
              <h1 className="login-title">Login</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control ref={mail} type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control ref={password} type="password" placeholder="Enter password" />
                </Form.Group>
                <Button className='m-4' variant="outline-secondary" type="submit">
                  Login
                </Button>
                <Link to="/register">Non hai un account? Registrati!</Link>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
