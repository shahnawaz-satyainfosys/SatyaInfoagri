import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import classNames from 'classnames';

const PasswordResetForm = ({ hasLabel }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [validated, setValidated] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password == formData.confirmPassword) {
      setValidated(true);
    } else {
      toast.error('Password does not matched', {
        theme: 'colored'
      });
    }
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form
      noValidate
      validated={validated}
      className={classNames('mt-3', { 'text-left': hasLabel })}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>New Password</Form.Label>}
        <Form.Control
          placeholder={'New Password'}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide password
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Confirm Password</Form.Label>}
        <Form.Control
          placeholder={'Confirm Password'}
          value={formData.confirmPassword}
          name="confirmPassword"
          onChange={handleFieldChange}
          type="password"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide confirm password
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" className="w-100">Set password</Button>
    </Form>
  );
};

PasswordResetForm.propTypes = {
  hasLabel: PropTypes.bool,
  encryptedClientCode: PropTypes.string
};

export default PasswordResetForm;