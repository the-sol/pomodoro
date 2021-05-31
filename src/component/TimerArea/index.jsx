import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './TimerArea.module.css';

const TimerArea = () => (
  <div>
    <Card className={styles.card}>
      <Card.Body className={styles.card__body}>
        <Card.Text className={styles.card__text}>
          00:25:00
        </Card.Text>
        <div className={styles.card__buttons}>
          <Button variant="dark" className={styles.card__start_btn} size="lg">Start &#128525;</Button>
          <Button variant="danger" className={styles.card__stop_btn} size="lg">Stop &#128564;</Button>
        </div>
      </Card.Body>
    </Card>
  </div>
);

export default TimerArea;
