import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import SettingsModal from '../SettingsModal';
import styles from './Header.module.css';
import pomoLogo from '../../Logo/PomoLogo.png';

function Header({
  onShouldAutoStartChange,
  shouldAutoStart,
  dataOfPeriods,
}) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <div className={styles.header}>
        <div>
          <Image className={styles['pomo-logo']} src={pomoLogo} rounded />
          <Navbar.Brand href="#home">TheSol-pomodoro</Navbar.Brand>
        </div>
        <div>
          <Button variant="outline-light" onClick={toggleShow}>
            Settings
          </Button>
        </div>
      </div>
      <Navbar.Collapse>
        <Nav className="ml-auto">
          <SettingsModal
            toggleShow={toggleShow}
            show={show}
            onShouldAutoStartChange={onShouldAutoStartChange}
            shouldAutoStart={shouldAutoStart}
            dataOfPeriods={dataOfPeriods}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

Header.propTypes = {
  onShouldAutoStartChange: PropTypes.func.isRequired,
  shouldAutoStart: PropTypes.bool.isRequired,
  dataOfPeriods: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      mins: PropTypes.number.isRequired,
      secs: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Header;
