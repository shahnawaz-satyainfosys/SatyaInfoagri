import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import defaultAvatar from 'assets/img/default-avatar.jpg';
import Avatar from 'components/common/Avatar';

const ProfileDropdown = () => {
  const userName = localStorage.getItem("LoginUserName");
  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle bsPrefix="toggle" as={Link} className="pe-0 ps-2 nav-link">
        <Avatar src={defaultAvatar} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <Dropdown.Item disabled>
            <b>{userName}</b>
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/logout">
            Logout
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;