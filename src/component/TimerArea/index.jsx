import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const TimerArea = () => (
  <Card>
    <Card.Body className="text-center">
      <h1>00:25:00</h1>
      <div className="d-flex justify-content-around">
        <Button variant="dark" size="lg">Start &#128525;</Button>
        <Button variant="info" size="lg">Stop &#128564;</Button>
      </div>
    </Card.Body>
  </Card>
);

export default TimerArea;
