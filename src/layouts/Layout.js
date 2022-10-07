import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import is from 'is_js';
import { toast, ToastContainer } from 'react-toastify';
import Counter from '../counter';
import CardLogin from 'components/authentication/card/Login';
import AppContext from 'context/Context';

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
        <Route path="counter" element={<Counter />} />
        <Route path="/login" element={<CardLogin />} />
      </Routes>
      <ToastContainer icon={false} position={toast.POSITION.TOP_RIGHT} />
    </>
  );
};

export default Layout;