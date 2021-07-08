import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TimerArea from './component/TimerArea';
import Footer from './component/Footer';
import Header from './component/Header';

const App = () => {
  const [shouldAutoStart, setShouldAutoStart] = useState(false);
  const toggleShouldAutoStart = () => { setShouldAutoStart(!shouldAutoStart); };
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onShouldAutoStartChange={toggleShouldAutoStart} shouldAutoStart={shouldAutoStart} />
      <Container fluid className="my-auto">
        <Row className="mt-3">
          <Col md={{ span: 6, offset: 3 }}><TimerArea shouldAutoStart={shouldAutoStart} /></Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
