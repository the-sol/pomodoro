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
import { initializePeriods } from './services/timer';

const App = () => {
  const [shouldAutoStart, setShouldAutoStart] = useState(false);
  const toggleShouldAutoStart = () => { setShouldAutoStart(!shouldAutoStart); };
  const [dataOfPeriods, setDataOfPeriods] = useState(null);

  useEffect(() => {
    firebase.firestore()
      .collection('SettingsData')
      .doc('PeriodsData')
      .get()
      .then((doc) => {
        const dbPeriods = doc.data().data;
        initializePeriods(dbPeriods);
        setDataOfPeriods(dbPeriods);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!dataOfPeriods) {
    return (
      <Spinner className="spinner" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        onShouldAutoStartChange={toggleShouldAutoStart}
        shouldAutoStart={shouldAutoStart}
        dataOfPeriods={dataOfPeriods}
      />
      <Container fluid className="my-auto">
        <Row className="mt-3">
          <Col md={{ span: 6, offset: 3 }}>
            <TimerArea shouldAutoStart={shouldAutoStart} dataOfPeriods={dataOfPeriods} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
