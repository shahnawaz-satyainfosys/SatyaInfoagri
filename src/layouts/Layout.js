import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import is from 'is_js';
import { toast, ToastContainer } from 'react-toastify';
import AppContext from 'context/Context';
import 'assets/css/custom.css';
import axios from 'axios';
import $ from 'jquery';

import MainLayout from './MainLayout';
import HomeLayout from './HomeLayout';
import Home from 'components/Home';
import Error500 from 'components/errors/Error500';

import CardLogin from 'components/authentication/card/Login';
import CardForgetPassword from 'components/authentication/card/ForgetPassword';
import CardConfirmMail from 'components/authentication/card/ConfirmMail';
import CardPasswordReset from 'components/authentication/card/PasswordReset';

import Spinners from 'components/doc-components/Spinners';
import Dashboard from 'components/dashboards/default/dashboard';

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

  useEffect(() => {
    const encryptedClientCode = localStorage.getItem("EncryptedClientCode");
    axios.get(process.env.REACT_APP_API_URL + '/get-menu-tree/' + encryptedClientCode)
      .then(res => {
        if (res.data.status == 200) {
          var menuHtml = '';
          for (let i = 0; i < res.data.data.length; i++) {
            const name = res.data.data[i].menU_ITEM_NAME;
            const menuUrl = res.data.data[i].menU_ITEM_PAGE_URL;

            menuHtml += `<li class="nav-item">
            <a aria-current="page" class="nav-link" href="${menuUrl}">
              <div class="d-flex align-items-center">
                <span class="nav-link-icon"></span>
                <span class="nav-link-text ps-1">${name}</span>
              </div>
            </a>
          </li>`
          }
          $('.navbar-vertical-content .navbar-nav').append(menuHtml);
        }
      });
  }, []);

  return (
    <>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/error" element={<Error500 />} />
        </Route>
        <Route path="/login" element={<CardLogin />} />
        <Route path="/forgot-password" element={<CardForgetPassword />} />
        <Route path="/confirm-mail" element={<CardConfirmMail />} />
        <Route path="/reset-password/:id" element={<CardPasswordReset />} />

        <Route path="/spinners" element={<Spinners />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <ToastContainer icon={false} position={toast.POSITION.TOP_RIGHT} />
    </>
  );
};

export default Layout;