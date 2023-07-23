import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { fetchLogin } from '../../redux/reducers/LoginSlice';
import './login.css';

export default function Login() {
  const [notexist, setNotexist] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mail = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
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
          setNotexist(true);
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
              <img className='mb-5' width={150} src={logo} alt="" />
              <Form onSubmit={handleSubmit} >
                {notexist && <Alert variant="danger">Email o Password errati</Alert>}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control ref={mail} type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control ref={password} type="password" placeholder="Enter password" />
                </Form.Group>
                <Button className='m-4' variant="outline-success" type="submit">
                  Login
                </Button>
                <Link className='text-muted' to="/register">SingUp</Link>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
