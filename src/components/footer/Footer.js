import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { version } from 'config';

const Footer = () => (
  <footer className="footer">
    <Row className="justify-content-between fs--1 mt-4 mb-3 footer-credits">
      <Col sm="auto">
        <p className="mb-0 text-600">
          Khalihan{' '}
          <span className="d-none d-sm-inline-block">| </span>
          <br className="d-sm-none" /> {new Date().getFullYear()} &copy;{' '}
          <a href="http://satyainfosys.com">Satya Infosys</a>
          <span className="mb-0 text-600"> Version {version}</span>
        </p>
      </Col>
      <Col sm="auto"></Col>
    </Row>
  </footer>
);

export default Footer;