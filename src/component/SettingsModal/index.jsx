import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import SettingsForm from '../SettingsForm';

function SettingsModal({ toggleShow, show }) {
  return (
    <>
      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SettingsForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

SettingsModal.propTypes = {
  toggleShow: PropTypes.func,
  show: PropTypes.bool,
};

SettingsModal.defaultProps = {
  toggleShow: 'toggleShow',
  show: 'show',
};

export default SettingsModal;
