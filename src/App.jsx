import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TimerArea from './component/TimerArea';
import Footer from './component/Footer';
import Header from './component/Header';

const App = () => {
  const [startAuto, setStartAuto] = useState(false);
  const handelStartAuto = () => { setStartAuto(!startAuto); };
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header handelStartAuto={handelStartAuto} />
      <Container fluid className="my-auto">
        <Row className="mt-3">
          <Col md={{ span: 6, offset: 3 }}><TimerArea startAuto={startAuto} /></Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
