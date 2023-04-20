import {
  getFirestore, getDoc, doc,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';

import { auth } from '../config';

const app = getApp();

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
  const user = auth.currentUser;
  const { uid } = user;
  // console.log(uid);
  return uid;
}

export default {
  getINFO,
  getUid,
};
