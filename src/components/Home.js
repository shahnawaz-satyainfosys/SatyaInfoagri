import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Card className="text-center">
      <Card.Body className="p-5">
        <p className="lead mt-4 text-800 font-sans-serif fw-semi-bold">
          Welcome to khalihan.in
        </p>
        <hr />
        <p>
          Site is in under construction, for now please click below Login button to continue.
        </p>
        <Link className="btn btn-primary btn-sm mt-3" to="/login">
          <FontAwesomeIcon className="me-2" />
          Login
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Home;