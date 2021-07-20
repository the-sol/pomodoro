import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import TimerArea from './component/TimerArea';
import Footer from './component/Footer';
import Header from './component/Header';
import firebase from './firebase';
import { setPeriods as setTimerServicePeriods } from './services/timer';

const App = () => {
  const [shouldAutoStart, setShouldAutoStart] = useState(false);
  const [periods, setPeriods] = useState(null);

  useEffect(() => {
    firebase.firestore()
      .collection('timer')
      .doc('settings')
      .onSnapshot((doc) => {
        const dbPeriods = doc.data().periods;
        setTimerServicePeriods(dbPeriods);
        setPeriods(dbPeriods);
      });
  }, []);
  if (!periods) {
    return (
      <Spinner className="spinner" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  const toggleShouldAutoStart = () => { setShouldAutoStart(!shouldAutoStart); };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        onShouldAutoStartChange={toggleShouldAutoStart}
        shouldAutoStart={shouldAutoStart}
        periods={periods}
      />
      <Container fluid className="my-auto">
        <Row className="mt-3">
          <Col md={{ span: 6, offset: 3 }}>
            <TimerArea shouldAutoStart={shouldAutoStart} periods={periods} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
