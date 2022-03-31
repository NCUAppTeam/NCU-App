import firebase from 'firebase';
import Fuse from 'fuse.js';
// import storage from '@react-native-firebase/storage';

/**
 *
 * @param {*} time
 * @returns
 */

function toDateString(time) {
  const date = new Date(time * 1000);
  const dateString = `${date.getFullYear().toString() - 1969}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getDate().toString().padStart(2, '0')}  ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}`;
  return dateString;
}

function Datewithnoyr(time) {
  const date = new Date(time * 1000);
  const noyr = `${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getDate().toString().padStart(2, '0')} ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}`;
  return noyr;
}

const firebaseConfig = {
  apiKey: "AIzaSyBAdIwqHbhRHs7pgEukVCc2uXUwRAmJu8w",
  authDomain: "active-e1014.firebaseapp.com",
  projectId: "active-e1014",
  storageBucket: "active-e1014.appspot.com",
  messagingSenderId: "1030625507659",
  appId: "1:1030625507659:web:3665e92f26f92e7bc850ce",
  measurementId: "G-YR1M91G56B"
};


//   測試用 Firebase
// const firebaseConfig = {
//   apiKey: 'AIzaSyBm2ChoLgXWTpgqEY-ZcANn2Uymmop0hPM',
//   authDomain: 'test-85cdf.firebaseapp.com',
//   projectId: 'test-85cdf',
//   storageBucket: 'test-85cdf.appspot.com',
//   messagingSenderId: '15833338613',
//   appId: '1:15833338613:web:b7f820d6b80972c40babbc',
//   measurementId: 'G-KLH3NVQ7PH',
// };

//    測試用 output -- 顯示在手機上
/**
 *
 * @param {*} rawdata
 * @returns
 */

/**
 *
 * @param {*} imageUri
 * @returns
 */
function imagePos(imageUri) {
  return imageUri.split('/').pop();
}

/**
 *
 * @param {*} active
 */
async function addActive(active) {
  const db = firebase.firestore();
  const activesRef = db.collection('actives');

  const imageAddress = `actives/${imagePos(active.image)}`;
  const storageRef = firebase.storage().ref().child(imageAddress);
  const response = await fetch(active.image);
  const blob = await response.blob();
  const st = storageRef.put(blob);
  await st;

  const url = await storageRef.getDownloadURL();

  const item = {
    name: active.name,
    imageUri: url,
    image: active.image,
    imageAddress,
    startTime: active.startTime,
    endTime: active.endTime,
    uploadTime: active.uploadTime,
    place: active.place.trim(),
    cost: active.cost,
    limitNum: active.limitNum,
    genre: active.genre,
    link: active.link.trim(),
    hostName: active.hostName.trim(),
    hostPhone: active.hostPhone.trim(),
    hostMail: active.hostMail.trim(),
    details: active.details.trim(),
  };
  activesRef.add(item);
  console.log('addActive Successful');
}

async function getAllActive() {
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const activeArray = [];
  const querySnapshot = await activesRef.orderBy('uploadTime', 'desc').get();
  querySnapshot.forEach((doc) => {
    activeArray.push({
      id: doc.id,
      name: doc.data().name,
      imageUri: doc.data().imageUri,
      startTime: toDateString(doc.data().startTime),
      startNoYr: Datewithnoyr(doc.data().startTime),
      endTime: toDateString(doc.data().endTime),
      endNoYr: Datewithnoyr(doc.data().endTime),
      place: doc.data().place,
      cost: doc.data().cost,
      limitNum: doc.data().limitNum,
      genre: doc.data().genre,
      link: doc.data().link,
      hostName: doc.data().hostName,
      hostPhone: doc.data().hostPhone,
      hostMail: doc.data().hostMail,
      details: doc.data().details,
    });
  });
  console.log(activeArray);
  console.log('getAllActive Successful');
  return activeArray;
}

async function getOneActive(id) {
  console.log('testnew', id);
  const db = firebase.firestore();
  const activesRef = db.collection('actives').doc(id);

  const querySnapshot = await activesRef.get();
  const oneactive = [{
    id: querySnapshot.id,
    name: querySnapshot.data().name,
    imageUri: querySnapshot.data().imageUri,
    startTime: toDateString(querySnapshot.data().startTime),
    startNoYr: Datewithnoyr(querySnapshot.data().startTime),
    endTime: toDateString(querySnapshot.data().endTime),
    endNoYr: Datewithnoyr(querySnapshot.data().endTime),
    place: querySnapshot.data().place,
    cost: querySnapshot.data().cost,
    limitNum: querySnapshot.data().limitNum,
    genre: querySnapshot.data().genre,
    link: querySnapshot.data().link,
    hostName: querySnapshot.data().hostName,
    hostPhone: querySnapshot.data().hostPhone,
    hostMail: querySnapshot.data().hostMail,
    details: querySnapshot.data().details,
  }];

  console.log(querySnapshot.data());

  console.log('getOneActive Successful');

  return oneactive;
}

/**
 *
 * @param {*} genre
 * @returns
 */

async function getGenreActive(genre) {
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const GenreArray = [];
  const querySnapshot = await activesRef.where('genre', '==', genre).get();
  querySnapshot.forEach((doc) => {
    GenreArray.push({
      id: doc.id,
      name: doc.data().name,
      imageUri: doc.data().imageUri,
      startTime: toDateString(doc.data().startTime),
      startNoYr: Datewithnoyr(doc.data().startTime),
      endTime: toDateString(doc.data().endTime),
      endNoYr: Datewithnoyr(doc.data().endTime),
      place: doc.data().place,
      cost: doc.data().cost,
      limitNum: doc.data().limitNum,
      genre: doc.data().genre,
      link: doc.data().link,
      hostName: doc.data().hostName,
      hostPhone: doc.data().hostPhone,
      hostMail: doc.data().hostMail,
      details: doc.data().details,
    });
  });
  console.log('getGnereActive Successful');
  return GenreArray;
}

/**
 *
 * @param {*} name
 * @returns
 */
async function getActiveByName(name) {
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const GenreArray = [];
  const querySnapshot = await activesRef.where('name', '==', name).get();
  querySnapshot.forEach((doc) => {
    GenreArray.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  console.log('getActiveByName Successful');
  return GenreArray;
}

async function deleteOneActive() {
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const querySnapshot = await activesRef.where('name', '===', 'undefined').get();
  querySnapshot.forEach((doc) => {
    db.collection('actives').doc(doc.id).delete();
  });
  console.log('deleteOneActive Successful');
}

async function deleteAllActive() {
  const db = firebase.firestore();
  const activesRef = db.collection('actives');

  const querySnapshot = await activesRef.get();
  querySnapshot.forEach((doc) => {
    firebase.storage().ref().child(doc.data().imageAddress).delete();
    db.collection('actives').doc(doc.id).delete();
  });

  console.log('deleteAllActive Successful');
}

async function fuseSearchName(searchString) {
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const activeArray = [];
  const querySnapshot = await activesRef.get();

  querySnapshot.forEach((doc) => {
    activeArray.push({
      id: doc.id,
      name: doc.data().name,
    });
  });

  const options = {
    includeScore: true,
    keys: ['name'],
  };

  const fuse = new Fuse(activeArray, options);
  const result = fuse.search(searchString);
  console.log(result);
  console.log('Search Successful');
  return result;
}

export default {
  firebaseConfig,
  addActive,
  getAllActive,
  getGenreActive,
  deleteOneActive,
  getOneActive,
  deleteAllActive,
  getActiveByName,
  fuseSearchName,
};
