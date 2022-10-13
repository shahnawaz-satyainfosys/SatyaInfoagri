import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import Logo from 'components/common/Logo';
import { Outlet } from 'react-router-dom';

import Section from 'components/common/Section';

const HomeLayout = () => {
  return (
    <Section className="py-0">
      <Row className="flex-center min-vh-100 py-6">
        <Col sm={11} md={9} lg={7} xl={6} className="col-xxl-5">
          <Logo width={200}/>
          <Outlet />
        </Col>
      </Row>
    </Section>
  );
};

HomeLayout.propTypes = {
  match: PropTypes.object
};

export default HomeLayout;