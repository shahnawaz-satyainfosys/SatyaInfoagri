import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

      <Link className="fs--1 text-600" to="#!">
        I can't recover my account using this page
        <span className="d-inline-block ms-1"> &rarr;</span>
      </Link>
    </Form>
  );
};

ForgetPasswordForm.propTypes = {
  layout: PropTypes.string
};

ForgetPasswordForm.defaultProps = { layout: 'simple' };

export default ForgetPasswordForm;