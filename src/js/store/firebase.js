import firebase from 'firebase';
import { API_KEY, PROJECT_ID, SENDER_ID } from './firebaseKeys';

const config = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: `${SENDER_ID}`
};

// initialize the firebase database with the config info
firebase.initializeApp(config);

const database = firebase.database();

// export the initialized database
export default database;
