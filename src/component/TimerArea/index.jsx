import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Timer from '../Timer';

const TimerArea = ({ toggle }) => (
  <Card>
    <Card.Body className="text-center">
      <Timer toggle={toggle} />
    </Card.Body>
  </Card>
);

TimerArea.propTypes = {
  toggle: PropTypes.bool,
};

TimerArea.defaultProps = {
  toggle: false,
};
export default TimerArea;
