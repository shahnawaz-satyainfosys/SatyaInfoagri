import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import is from 'is_js';
import { toast, ToastContainer } from 'react-toastify';
import AppContext from 'context/Context';

import HomeLayout from './HomeLayout';
import Home from 'components/Home';

import CardLogin from 'components/authentication/card/Login';
import CardForgetPassword from 'components/authentication/card/ForgetPassword';
import CardConfirmMail from 'components/authentication/card/ConfirmMail';
import CardPasswordReset from 'components/authentication/card/PasswordReset';

const Layout = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  useContext(AppContext);

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
  }, [HTMLClassList]);

  return (
    <>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<CardLogin />} />
        <Route path="/forgot-password" element={<CardForgetPassword />} />
        <Route path="/confirm-mail" element={<CardConfirmMail />} />
        <Route path="/reset-password/:id" element={<CardPasswordReset />} />
      </Routes>
      <ToastContainer icon={false} position={toast.POSITION.TOP_RIGHT} />
    </>
  );
};

export default Layout;