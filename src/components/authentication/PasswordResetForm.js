import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Spinner} from 'react-bootstrap';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { resetPasswordAction } from '../../actions/index';

const PasswordResetForm = ({ hasLabel, encryptedClientCode }) => {

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formHasError, setFormError] = useState(false);
  const [passwordErr, setPasswordErr] = useState({});
  const [confPasswordErr, setConfPasswordErr] = useState({});

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/validate-client/' + encryptedClientCode)
      .then(res => {
        if (res.data.status !== 200) navigate('/error')
      });
  }, []);

  const handleValidation = () => {
    const passwordErr = {};
    const confPasswordErr = {};
    let isValid = true;
    if (formData.password.length <= 0) {
      passwordErr.passwordEmpty = "Please provide password";
      isValid = false;
      setFormError(true);
    }
    else if (!validatePassword(formData.password)) {
      passwordErr.pwdNotValid = "Password must be of minimum 6 and maximum 16 characters including one special character, one number and one alphabet";
      isValid = false;
      setFormError(true);
    }

    if (formData.confirmPassword.length <= 0) {
      confPasswordErr.confPasswordEmpty = "Please provide confirm password";
      isValid = false;
      setFormError(true);
    }
    else if (formData.password != formData.confirmPassword) {
      confPasswordErr.confPwdNotMatch = "Password and confirm password should be same";
      isValid = false;
      setFormError(true);
    }

    if (!isValid) {
      setPasswordErr(passwordErr);
      setConfPasswordErr(confPasswordErr);
    }

    return isValid;
  }

  const validatePassword = (value) => {
    return /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (handleValidation()) {

      const reqParams = {
        NewPassword: formData.password,
        EncryptedClientCode: encryptedClientCode
      }
      dispatch(resetPasswordAction(formData.password));
      setIsLoading(true);
      axios.post(process.env.REACT_APP_API_URL + '/reset-password', reqParams)
        .then(res => {
          setIsLoading(false);
          if (res.data.status == 200) {
            toast.success(
              res.data.message, {
              theme: 'colored'
            });
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          } else {
            toast.error(res.data.message, {
              theme: 'colored'
            });
          }
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
    <>
    {isLoading ? (
      <Spinner
        className="position-absolute start-50 loader-color"
        animation="border"
      />
    ) : null}
    <Form
      noValidate
      validated={formHasError}
      className={classNames('mt-3', { 'text-left': hasLabel })}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>New Password</Form.Label>}
        <Form.Control
          placeholder={'New Password'}
          value={formData.password}
          name="password"
          maxLength="16"
          onChange={handleFieldChange}
          type="password"
          pattern="^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
          required
        />
        {Object.keys(passwordErr).map((key) => {
          return (
            <>
              <Form.Control.Feedback type="invalid">
                {passwordErr[key]}
              </Form.Control.Feedback>
            </>
          );
        })}
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Confirm Password</Form.Label>}
        <Form.Control
          placeholder={'Confirm Password'}
          value={formData.confirmPassword}
          name="confirmPassword"
          maxLength="16"
          onChange={handleFieldChange}
          type="password"
          pattern={formData.password}
          required
        />
        {Object.keys(confPasswordErr).map((key) => {
          return (
            <>
              <Form.Control.Feedback type="invalid">
                {confPasswordErr[key]}
              </Form.Control.Feedback>
            </>);
        })}
      </Form.Group>

      <Button type="submit" className="w-100">Set password</Button>
    </Form>
    </>
  );
};

PasswordResetForm.propTypes = {
  hasLabel: PropTypes.bool,
  encryptedClientCode: PropTypes.string
};

export default PasswordResetForm;