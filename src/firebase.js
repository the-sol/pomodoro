// eslint-disable-next-line import/no-extraneous-dependencies
import firebase from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'firebase/firestore';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC90q2dSY4tlg2BXG-H1IVQCtdjMjVwXe4',
  authDomain: 'sol-pomo.firebaseapp.com',
  projectId: 'sol-pomo',
  storageBucket: 'sol-pomo.appspot.com',
  messagingSenderId: '439767660233',
  appId: '1:439767660233:web:b32d2ca986b4beb1217f18',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
