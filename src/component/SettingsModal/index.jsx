import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import SettingsForm from '../SettingsForm';

function SettingsModal({
  toggleShow, show, onShouldAutoStartChange, shouldAutoStart, periods,
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
          periods={periods}
        />
      </Modal.Body>
    </Modal>
  );
}

SettingsModal.propTypes = {
  toggleShow: PropTypes.func.isRequired,
  onShouldAutoStartChange: PropTypes.func.isRequired,
  shouldAutoStart: PropTypes.bool.isRequired,
  show: PropTypes.bool,
  periods: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      mins: PropTypes.number.isRequired,
      secs: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

SettingsModal.defaultProps = {
  show: true,
};

export default SettingsModal;
