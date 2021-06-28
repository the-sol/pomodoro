import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Timer from '../Timer';

const TimerArea = ({ shouldAutoStart }) => (
  <Card>
    <Card.Body className="text-center">
      <Timer shouldAutoStart={shouldAutoStart} />
    </Card.Body>
  </Card>
);

TimerArea.propTypes = {
  shouldAutoStart: PropTypes.bool.isRequired,
};

export default TimerArea;
