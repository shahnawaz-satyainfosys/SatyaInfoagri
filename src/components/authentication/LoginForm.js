import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../actions/index';

const LoginForm = ({ hasLabel }) => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    remember: false
  });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
    const userData = {
      userId: formData.userId,
      loginPassword:formData.password
    }
    dispatch(loginAction(userData));
    axios.post( process.env.REACT_APP_API_URL +'/login', userData )
            .then(res => {
              if(res.data.status == 200){
                toast.success(`Logged in as ${formData.userId}`, {
                  theme: 'colored'
                });
                setTimeout(() => {navigate('/')}, 3000);
              } else{
                toast.error(res.data.message, {
                  theme: 'colored'
                });
              }
            })
  }  
  setValidated(true);
};

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={e => {handleSubmit(e)}}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>username, email or phone number</Form.Label>}
        <Form.Control
          placeholder={'Username, email or phone number'}
          value={formData.userId}
          name="userId"
          onChange={handleFieldChange}
          type="text"
          required
        />
        <Form.Control.Feedback type="invalid">
            Please provide username, email or phone number
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={hasLabel ? 'Password' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
          required
        />

        <Form.Control.Feedback type="invalid">
            Please enter password
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
            />
            <Form.Check.Label className="mb-0 text-700">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          <Link
            className="fs--1 mb-0"
            to={`/forgot-password`}
          >
            Forgot Password?
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
        >
          Log in
        </Button>
      </Form.Group>
    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;