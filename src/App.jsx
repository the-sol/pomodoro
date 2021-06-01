import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimerArea from './component/TimerArea';
import styles from './App.module.css';
import Footer from './component/Footer';

const App = () => (
  <div className={styles.container}>
    <div>
      <TimerArea />
    </div>
    <Footer />
  </div>
);

export default App;
