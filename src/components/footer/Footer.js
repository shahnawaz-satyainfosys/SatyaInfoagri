import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { version } from 'config';

const Footer = () => (
  <footer className="footer">
    <Row className="justify-content-between fs--1 mt-2 mb-2 footer-credits">
      <Col sm="auto">
        <p className="mb-0 text-600">| <a href="http://khalihan.in" target="_blank">Khalihan</a> | <a href="http://satyainfosys.com" target="_blank">Satya Infosys</a> | {new Date().getFullYear()} &copy; all right reserved | <span className="mb-0 text-600"> Version {version} |</span>
        </p>
      </Col>
      <Col sm="auto"></Col>
    </Row>
  </footer>
);

export default Footer;