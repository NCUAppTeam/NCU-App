import { initializeApp } from 'firebase/app';
import {
  getFirestore, getDoc, doc,
} from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA8GH6yj1i4gJM0H_ZTsurYG3Dqn4-nIS8',
  authDomain: 'ncu-app-test.firebaseapp.com',
  projectId: 'ncu-app-test',
  storageBucket: 'ncu-app-test.appspot.com',
  messagingSenderId: '739839700130',
  appId: '1:739839700130:web:37591d0118a440488cfbfb',
};
const app = initializeApp(firebaseConfig);

async function getINFO(UID) {
  const db = getFirestore(app);
  const infoDoc = doc(db, `attendees/${UID}`);

  const querySnapshot = await getDoc(infoDoc);
  const attendeeInfo = {
    studentUid: querySnapshot.id,
    avatar: querySnapshot.data().avatar,
    email: querySnapshot.data().email,
    grade: querySnapshot.data().grade,
    major: querySnapshot.data().major,
    name: querySnapshot.data().name,
    phone: querySnapshot.data().phone,
    studentID: querySnapshot.data().studentID,
  };
  return attendeeInfo;
}

function getUid() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { uid } = user;

  return uid;
}

export default {
  getINFO,
  getUid,
};
