import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

const ForgetPasswordForm = () => {
  // State
  const [userId, setUserId] = useState('');

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder={'Username, email or phone number'}
          value={userId}
          name="userId"
          onChange={({ target }) => setUserId(target.value)}
          type="text"
        />
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