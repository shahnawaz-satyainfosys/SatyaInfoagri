import React from 'react';
import ConfirmMailContent from 'components/authentication/ConfirmMailContent';
import AuthCardLayout from 'layouts/AuthCardLayout';

const ConfirmMail = () => (
  <AuthCardLayout>
    <div className="text-center">
      <ConfirmMailContent titleTag="h3" />
    </div>
  </AuthCardLayout>
);

export default ConfirmMail;