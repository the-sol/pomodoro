import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import SettingsForm from '../SettingsForm';

function SettingsModal({
  toggleShow, show, onShouldAutoStartChange, shouldAutoStart,
}) {
  return (
    <Modal show={show} onHide={toggleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SettingsForm
          onShouldAutoStartChange={onShouldAutoStartChange}
          shouldAutoStart={shouldAutoStart}
        />
      </Modal.Body>
    </Modal>
  );
}

SettingsModal.propTypes = {
  toggleShow: PropTypes.func.isRequired,
  onShouldAutoStartChange: PropTypes.func.isRequired,
  shouldAutoStart: propTypes.bool,
  show: PropTypes.bool,
};

SettingsModal.defaultProps = {
  show: true,
  shouldAutoStart: false,

};

export default SettingsModal;
