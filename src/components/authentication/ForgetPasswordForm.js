import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordForm = () => {
  // State
  const [userId, setUserId] = useState('');
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setIsLoading(true);
      axios.post(process.env.REACT_APP_API_URL + '/forget-password/' + userId)
        .then(res => {
          setIsLoading(false);
          if (res.data.status == 200) {
            setTimeout(() => { navigate('/confirm-mail') }, 1000);
          } else {
            toast.error(res.data.message, {
              theme: 'colored',
              autoClose: 10000
            });
          }
        })
    }
    setValidated(true);
  };

  return (
    <>
      {isLoading ? (
        <Spinner
          className="position-absolute start-50 loader-color"
          animation="border"
        />
      ) : null}
      <Form noValidate validated={validated} className="mt-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder={'Username, email or phone number'}
            value={userId}
            name="userId"
            maxLength="50"
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
    </>
  );
};

ForgetPasswordForm.propTypes = {
  layout: PropTypes.string
};

ForgetPasswordForm.defaultProps = { layout: 'simple' };

export default ForgetPasswordForm;