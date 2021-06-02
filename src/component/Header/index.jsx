import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import styles from './Header.module.css';
import pomoLogo from '../../Logo/PomoLogo.png';
import settingLogo from '../../Logo/SettingLogo.png';
import loginLogo from '../../Logo/LoginLogo.png';

const Header = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Image className={styles['pomo-logo']} src={pomoLogo} rounded />
    <Navbar.Brand href="#home">TheSol-pomodoro</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav className="ml-auto">
        <Image className={styles['setting-logo']} src={settingLogo} rounded />
        <Nav.Link href="#setting">Setting</Nav.Link>
        <Image className={styles['login-logo']} src={loginLogo} rounded />
        <Nav.Link href="#login">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
