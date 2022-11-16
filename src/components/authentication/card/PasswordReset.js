import React from 'react';
import PasswordResetForm from 'components/authentication/PasswordResetForm';
import AuthCardLayout from 'layouts/AuthCardLayout';
import { useParams } from 'react-router-dom';

const PasswordReset = () => {
  const { id } = useParams();
  return (
    <AuthCardLayout>
      <h3>Reset password</h3>
      <PasswordResetForm layout="card" hasLabel encryptedSecurityUserId={id} />
    </AuthCardLayout>
  );
};

export default PasswordReset;