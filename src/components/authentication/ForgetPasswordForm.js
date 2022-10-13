import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordForm = () => {
  // State
  const [userId, setUserId] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      axios.post(process.env.REACT_APP_API_URL + '/forget-password/' + userId)
        .then(res => {
          if (res.data.status == 200) {
            setTimeout(() => {navigate('/confirm-mail')}, 3000);
          } else {
            toast.error(res.data.message, {
              theme: 'colored'
            });
          }
        })
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} className="mt-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder={'Username, email or phone number'}
          value={userId}
          name="userId"
          onChange={({ target }) => setUserId(target.value)}
          type="text"
          required
        />
        <Form.Control.Feedback type="invalid">
            Please provide username, email or phone number
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Button className="w-100" type="submit">
          Send reset link
        </Button>
      </Form.Group>
    </Form>
  );
};

ForgetPasswordForm.propTypes = {
  layout: PropTypes.string
};

ForgetPasswordForm.defaultProps = { layout: 'simple' };

export default ForgetPasswordForm;