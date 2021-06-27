import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Timer from '../Timer';

const TimerArea = ({ startAuto }) => (
  <Card>
    <Card.Body className="text-center">
      <Timer toggle={startAuto} />
    </Card.Body>
  </Card>
);

TimerArea.propTypes = {
  startAuto: PropTypes.bool,
};

TimerArea.defaultProps = {
  startAuto: false,
};
export default TimerArea;
