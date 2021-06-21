import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import SettingsModal from '../SettingsModal';
import styles from './Header.module.css';
import pomoLogo from '../../Logo/PomoLogo.png';

function Header() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Image className={styles['pomo-logo']} src={pomoLogo} rounded />
      <Navbar.Brand href="#home">TheSol-pomodoro</Navbar.Brand>
      <Button variant="outline-light" onClick={toggleShow}>
        Settings
      </Button>
      <Navbar.Collapse>
        <Nav className="ml-auto">
          <SettingsModal toggleShow={toggleShow} show={show} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Header;
