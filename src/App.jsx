import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import StartButton from './component/StartButton';
import styles from './App.module.css';
// import Header from './component/Header';
import TimerArea from './component/TimerArea';
import Footer from './component/Footer';

const App = () => (
  <div className={styles.container}>
    <div>
      {/* <Header /> */}
      <TimerArea />
    </div>
    <Footer />

  </div>
);

export default App;
