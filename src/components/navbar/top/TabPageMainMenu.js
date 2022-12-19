import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import classNames from 'classnames';
import { topNavbarBreakpoint } from 'config';
import { Form, Row, Col, Button } from 'react-bootstrap';
import TopNavRightSideNavItem from './TopNavRightSideNavItem';

const TabPageMainMenu = ({newClick, cancelClick, exitClick, saveClick} ) => {
  
  const [showDropShadow, setShowDropShadow] = useState(false);

  const setDropShadow = () => {
    const el = document.documentElement;
    if (el.scrollTop > 0) {
      setShowDropShadow(true);
    } else {
      setShowDropShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setDropShadow);
    return () => window.removeEventListener('scroll', setDropShadow);
  }, []);

  return (
    <Navbar
      className={classNames('navbar-glass  fs--1 navbar-top sticky-kit', {
        'navbar-glass-shadow': showDropShadow
      })}
    >

      <Nav
        navbar
        className={`align-items-center d-none d-${topNavbarBreakpoint}-block`}
        as="ul"
      >
        <Form>
          <Row>
            <Col>
              <div style={{ display: "flex", justifyContent: "left", backgroundColor: "#c9ebcd", borderRadius: "8px" }}>
                <Button className='btn btn-primary me-1' id='btnNew' onClick={newClick}>
                  <span class="fas fa-plus me-1" data-fa-transform="shrink-3"></span>New
                </Button>
                <Button className='btn btn-success me-1' id='btnSave' onClick={saveClick}>
                  <span class="fas fa-save me-1" data-fa-transform="shrink-3"></span>Save
                </Button>
                <Button className='btn btn-danger me-1' id='btnCancel'  onClick={cancelClick}>
                  <span class="fas fa-times me-1" data-fa-transform="shrink-3"></span>Cancel
                </Button>
                <Button className='btn btn-info mr-4' id='btnExit' onClick={exitClick}>
                  <span class="fas fa-sign-out-alt me-1" data-fa-transform="shrink-3"></span>Exit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Nav>

      <TopNavRightSideNavItem />

    </Navbar>
  );
};

export default TabPageMainMenu;