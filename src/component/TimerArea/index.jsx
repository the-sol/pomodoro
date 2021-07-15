import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Timer from '../Timer';

const TimerArea = ({ shouldAutoStart, periods }) => (
  <Card>
    <Card.Body className="text-center">
      <Timer shouldAutoStart={shouldAutoStart} periods={periods} />
    </Card.Body>
  </Card>
);

TimerArea.propTypes = {
  shouldAutoStart: PropTypes.bool.isRequired,
  periods: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      mins: PropTypes.number.isRequired,
      secs: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TimerArea;
