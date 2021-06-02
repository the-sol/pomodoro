import React from 'react';
import Card from 'react-bootstrap/Card';
import Timer from '../Timer';

const TimerArea = () => (
  <Card>
    <Card.Body className="text-center">
      <Timer />
    </Card.Body>
  </Card>
);

export default TimerArea;
