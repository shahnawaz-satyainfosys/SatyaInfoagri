import React from 'react';
import { Nav } from 'react-bootstrap';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';

const TopNavRightSideNavItem = () => {

  return (
    <Nav navbar className="navbar-nav-icons ms-auto flex-row align-items-center" as="ul">
      <Nav.Item as={'li'}>
      </Nav.Item>

      <ProfileDropdown />
    </Nav>
  );
};

export default TopNavRightSideNavItem;