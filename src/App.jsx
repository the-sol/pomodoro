import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TimerArea from './component/TimerArea';
import styles from './App.module.css';
import Footer from './component/Footer';

const App = () => (
  <Container fluid className={styles.container}>
    <Row className="text-center">
      <Col><TimerArea /></Col>
    </Row>
    <Row>
      <Col><Footer /></Col>
    </Row>
  </Container>
);

export default App;
