import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TimerArea from './component/TimerArea';
import Footer from './component/Footer';
import Header from './component/Header';

const App = () => (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <Container fluid className="my-auto">
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}><TimerArea /></Col>
      </Row>
    </Container>
    <Footer />
  </div>
);

export default App;
