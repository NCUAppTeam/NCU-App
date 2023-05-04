import firebase from 'firebase/app';

async function getCurrentUserProfile() {
  return firebase.auth().currentUser;
}

async function getProfile(uid) {
  const db = firebase.firestore();
  const docRef = db.collection('profiles').doc(uid);
  const doc = await docRef.get();
  if (doc.exists) {
    return doc.data();
  }
  return { success: false };
}

async function updateProfile(uid, data) {
  const db = firebase.firestore();
  db.collection('profiles').doc(uid).set(data);
}

export default {
  getCurrentUserProfile,
  getProfile,
  updateProfile,
};
