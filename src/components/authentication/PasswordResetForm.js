import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
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
  
  const [formHasError, setFormError] = useState(false);
  const [isPwdEmpty, setPwdEmptyStatus] = useState(false);
  const [isPwdInvalid, setPwdValidated] = useState(false);
  const [isConfPwdEmpty, setConfPwdEmptyStatus] = useState(false);
  const [isConfPwdInvalid, setConfPwdValidated] = useState(false);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/validate-client/' + encryptedClientCode)
      .then(res => {
        if (res.data.status !== 200) navigate('/error')
      });
  }, []);

  const validatePassword = (value) => {
    return /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value);
  }

  const handleSubmit = e => {
    e.preventDefault();
      if (formData.password.length <= 0) {
        setFormError(true);
        setPwdEmptyStatus(true);
      }
      else{
        setFormError(false);
        setPwdEmptyStatus(false);
      }
      
      if (formData.confirmPassword.length <= 0) {
        setFormError(true);
        setConfPwdEmptyStatus(true);
      }
      else{
        setFormError(false);
        setConfPwdEmptyStatus(false);
      }

      if(!validatePassword(formData.password))
      {
        setPwdValidated(true);
      }

      if(formData.password != formData.confirmPassword)
      {
        setConfPwdValidated(true);
      }

        if (!formHasError &&
          !isPwdEmpty &&
          !isConfPwdEmpty &&
          !isPwdInvalid &&
          !isConfPwdInvalid) {
        
        const reqParam = {
          NewPassword: formData.password,
          EncryptedClientCode: encryptedClientCode
        }
        dispatch(resetPasswordAction(formData.password));
        axios.post(process.env.REACT_APP_API_URL + '/reset-password', reqParam)
          .then(res => {
            if (res.data.status == 200) {
              toast.success(
                'Login with your new password, redirecting to login page', {
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
          maxLength="20"
          onChange={handleFieldChange}
          type="password"
          pattern="^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
          required
        />
        {isPwdEmpty ? 
            <Form.Control.Feedback type="invalid">
              Please provide password
            </Form.Control.Feedback> : null }

            {!isPwdEmpty && isPwdInvalid ?
            <Form.Control.Feedback type="invalid">
              Password must be of minimum 6 and maximum 16 characters including one special character, one number and one alphabet
            </Form.Control.Feedback>
        : null}
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Confirm Password</Form.Label>}
        <Form.Control
          placeholder={'Confirm Password'}
          value={formData.confirmPassword}
          name="confirmPassword"
          maxLength="20"
          onChange={handleFieldChange}
          type="password"
          pattern={formData.password}
          required
        />
        {isConfPwdEmpty ?
            <Form.Control.Feedback type="invalid">
              Please provide confirm password
            </Form.Control.Feedback> : null }
         {!isConfPwdEmpty && isConfPwdInvalid ?
            <Form.Control.Feedback type="invalid">
              Password and confirm password should be same
            </Form.Control.Feedback> 
          :null}
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