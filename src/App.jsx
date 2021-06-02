import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TimerArea from './component/TimerArea';
import Footer from './component/Footer';

const App = () => (
  <div className="d-flex flex-column min-vh-100">
    <Container fluid>
      <Row className="text-center">
        <Col><TimerArea /></Col>
      </Row>
    </Container>
    <Footer />
  </div>
);

export default App;
