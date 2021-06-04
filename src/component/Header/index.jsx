import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import SettingForm from '../SettingForm';
import styles from './Header.module.css';
import pomoLogo from '../../Logo/PomoLogo.png';
import settingLogo from '../../Logo/SettingLogo.png';
import loginLogo from '../../Logo/LoginLogo.png';

function SettingModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-light" className="mb-3" onClick={handleShow}>
        <i>setting</i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SettingForm />
        </Modal.Body>
      </Modal>
    </>
  );
}
const Header = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Image className={styles['pomo-logo']} src={pomoLogo} rounded />
    <Navbar.Brand href="#home">TheSol-pomodoro</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav className="ml-auto">
        <Image className={styles['setting-logo']} src={settingLogo} rounded />
        <Nav.Link href="#setting">
          <SettingModal />
        </Nav.Link>
        <Image className={`${styles['login-logo']}`} src={loginLogo} rounded />
        <Nav.Link href="#login" className="text-white">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
