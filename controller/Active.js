import firebase from 'firebase';
import Fuse from 'fuse.js';
// import storage from '@react-native-firebase/storage';

const values = ['揪人共乘', '揪人運動', '揪人遊戲', '校園活動', '系上活動', '社團活動'];
const defaultLinks = {
  0:
    {
      id: '0',
      type: 'carpool',
      link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2FAImKb4m8BxsM3lIyYBDCGJBWH6lXBB3FB9LZveoRoq1NsgarKrRJO5jdwBDNhlb-8AwXkOfVAf2a2x12HxONG-8%3Dw1280?alt=media&token=3d70e398-e41f-45a0-bd71-402a83ee9482',
    },
  1:
    {
      id: '1',
      type: 'exercising',
      link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2F13WRw2-wmjCVD1QuSUjUjeJVOKnamdacrG9rYAu-6TEjxao7qkq4SaaL6I--LsqFdPiDto2MripJ0AeqX1jpLkw%3Dw1280?alt=media&token=30dc159f-b873-4c01-8095-47dcd7eb1e52',
    },
  2: {
    id: '2',
    type: 'HangOut',
    link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2F9-KpYqgT7JpVxN9YJdyZK6cs1KkjkW3FvJfNN_MKIWC0TJsF23naOw4xeELUkmKGpK0Ql-YwOYAV6Nm7a10aHBs%3Dw1280?alt=media&token=d3e971f5-4494-405a-a327-e215b7947fc8',
  },
  3: {
    id: '3',
    type: 'schoolEvent',
    link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2FVhFxnnfJno8OaJEejdzQUfTkOPBXH0EkDpp_fZU1lAqe8mxsqUryurnBGu88QwWx1ZuW5dOMUwQdOOIlVHXZVdo%3Dw1280?alt=media&token=f728d517-3e01-40b3-853a-19530447ad84',
  },
  4: {
    id: '4',
    type: 'tiedEvent',
    link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2FMI5GYVApUBawNSN07_TzzpjRT4Kso7Lr2xa0ryVIiRM6dvFQBsgr568WEfLCLtl1NeUia0wZQB8ZBrvATX7dvKo%3Dw1280?alt=media&token=72657e1a-0bc5-43db-b981-3da482226a49',
  },
  5: {
    id: '5',
    type: 'clubEvent',
    link: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2F_4pimcui3FxablQrSCnQcZYCRBw8GHl-P604nwcGPnniiMrAoE23lCkWaaEgJ2flQbqcxTrn7PEp6GnehqFeruE%3Dw1280?alt=media&token=acca5f3f-000d-41bb-b7a2-c5575641cdfb',
  },
};

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

function dateToWeekday(t) {
  const time = new Date(t * 1000);
  const y = (time.getFullYear().toString() - 1969) % 100;
  const c = ((time.getFullYear().toString() - 1969) % 100 === 0)
    ? ((time.getFullYear().toString() - 1969).toString().substring(0, 2) - 1)
    : (time.getFullYear().toString() - 1969).toString().substring(0, 2);
  let m = 0;
  if ((time.getMonth() + 1).toString() === 1) {
    m = 13;
  } else if ((time.getMonth() + 1).toString() === 2) {
    m = 14;
  } else {
    m = (time.getMonth() + 1).toString();
  }
  const d = time.getDate().toString();
  const day = (y + Math.floor((y / 4)) + Math.floor((c / 4)) - 2 * c
  + Math.floor(2.6 * m + 2.6) + d * 1 - 1) % 7;
  let weekday = '';
  if (day === 0) { weekday = '星期日'; } else if (day === 1) { weekday = '星期一'; } else if (day === 2) { weekday = '星期二'; } else if (day === 3) { weekday = '星期三'; } else if (day === 4) { weekday = '星期四'; } else if (day === 5) { weekday = '星期五'; } else if (day === 6) { weekday = '星期六'; }
  const check = `${(time.getMonth() + 1).toString()}月${time.getDate().toString()}日 ${weekday} ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
  return check;
}

function sentMessage(message) {
  console.log(message);
}

const firebaseConfig = {
  apiKey: 'AIzaSyBAdIwqHbhRHs7pgEukVCc2uXUwRAmJu8w',
  authDomain: 'active-e1014.firebaseapp.com',
  projectId: 'active-e1014',
  storageBucket: 'active-e1014.appspot.com',
  messagingSenderId: '1030625507659',
  appId: '1:1030625507659:web:3665e92f26f92e7bc850ce',
  measurementId: 'G-YR1M91G56B',
};

//   測試用 Firebase//劭劭的
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
  let uri1;
  let uri2;
  let uri3;

  const item = {
    name: active.name,
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

  if (active.image1) {
    const imageAddress = `actives/${imagePos(active.image1)}`;
    const storageRef = firebase.storage().ref().child(imageAddress);
    const response = await fetch(active.image1);
    const blob = await response.blob();
    const st1 = storageRef.put(blob);
    await st1;
    uri1 = await storageRef.getDownloadURL();
    if (uri1 !== undefined) {
      item.imageUri1 = uri1;
    }
  } else {
    item.imageUri1 = defaultLinks[values.indexOf(active.genre)].link;
  }

  if (active.image2) {
    const imageAddress = `actives/${imagePos(active.image2)}`;
    const storageRef = firebase.storage().ref().child(imageAddress);
    const response = await fetch(active.image2);
    const blob = await response.blob();
    const st2 = storageRef.put(blob);
    await st2;
    uri2 = await storageRef.getDownloadURL();
    if (uri2 !== undefined) {
      item.imageUri2 = uri2;
    }
  }
  if (active.image3) {
    const imageAddress = `actives/${imagePos(active.image3)}`;
    const storageRef = firebase.storage().ref().child(imageAddress);
    const response = await fetch(active.image3);
    const blob = await response.blob();
    const st3 = storageRef.put(blob);
    await st3;
    uri3 = await storageRef.getDownloadURL();
    if (uri3 !== undefined) {
      item.imageUri3 = uri3;
    }
  }

  if (active.cost === 0 || active.cost === '') {
    item.cost = '免費free';
  }
  if (active.limitNum === 0) {
    item.limitNum = '人數沒限制';
  }
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  console.log('active');
  console.log(item);
  activesRef.add(item);
  console.log('addActive Successful');
}

/**
 *
 * @param {*} oldID
 * @param {*} NEWactive
 */
async function updateActive(oldID, NEWactive) {
  let uri1;
  let uri2;
  let uri3;
  let defaultRef;

  const NEWitem = NEWactive;
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const querySnapshot = await activesRef.doc(oldID).get();

  if (NEWactive.genre) {
    defaultRef = defaultLinks[values.indexOf(NEWactive.genre)].link;
  } else {
    defaultRef = defaultLinks[values.indexOf(querySnapshot.data().genre)].link;
  }

  if (!NEWactive.image1 && NEWactive.genre && querySnapshot.data().imageUri1 === defaultLinks[values.indexOf(querySnapshot.data().genre)].link) {
    console.log('new genre link');
    NEWitem.imageUri1 = defaultRef;
  } else if (!NEWactive.image1 && !NEWactive.genre && querySnapshot.data().imageUri1 === defaultLinks[values.indexOf(querySnapshot.data().genre)].link) {
    console.log('new genre link');
    NEWitem.imageUri1 = defaultRef;
  } else if (NEWactive.image1 === values.indexOf(querySnapshot.data().genre)) {
    NEWitem.imageUri1 = defaultRef;
  } else if (NEWactive.image1 === values.indexOf(NEWactive.genre)) {
    NEWitem.imageUri1 = defaultRef;
  } else if (NEWactive.image1) {
    if (NEWactive.image1 === querySnapshot.data().imageUri2) {
      activesRef.doc(oldID).update({
        image2: firebase.firestore.FieldValue.delete(),
        imageUri2: firebase.firestore.FieldValue.delete(),
      });
    }
    const imageAddress = `actives/${imagePos(NEWactive.image1)}`;
    const storageRef = firebase.storage().ref().child(imageAddress);
    const response = await fetch(NEWactive.image1);
    const blob = await response.blob();
    const st1 = storageRef.put(blob);
    await st1;
    uri1 = await storageRef.getDownloadURL();
    if (uri1 !== undefined) {
      NEWitem.imageUri1 = uri1;
    }
  }

  if (NEWactive.image2) {
    if (NEWactive.image2 === querySnapshot.data().imageUri3) {
      activesRef.doc(oldID).update({
        image3: firebase.firestore.FieldValue.delete(),
        imageUri3: firebase.firestore.FieldValue.delete(),
      });
    }
    const imageAddress = `actives/${imagePos(NEWactive.image2)}`;
    const storageRef = firebase.storage().ref().child(imageAddress);
    const response = await fetch(NEWactive.image2);
    const blob = await response.blob();
    const st2 = storageRef.put(blob);
    await st2;
    uri2 = await storageRef.getDownloadURL();
    if (uri2 !== undefined) {
      NEWitem.imageUri2 = uri2;
    }
  } else {
    delete NEWitem.image2;
  }

  if (NEWactive.image3) {
    const imageAddress = `actives/${imagePos(NEWactive.image3)}`;
    const storageRef = firebase.storage().ref().child(imageAddress);
    const response = await fetch(NEWactive.image3);
    const blob = await response.blob();
    const st3 = storageRef.put(blob);
    await st3;
    uri3 = await storageRef.getDownloadURL();
    if (uri3 !== undefined) {
      NEWitem.imageUri3 = uri3;
    }
  } else {
    delete NEWitem.image3;
  }

  if (NEWactive.cost) {
    if (NEWactive.cost === 0 || NEWactive.cost === '') {
      NEWitem.cost = '免費free';
    }
  }
  if (NEWactive.limitNum) {
    if (NEWactive.limitNum === 0) {
      NEWitem.limitNum = '人數沒限制';
    }
  }

  console.log(NEWitem);
  if (NEWitem.imageUri1) {
    if (querySnapshot.data().imageUri1 !== defaultLinks[values.indexOf(querySnapshot.data().genre)].link) {
      console.log('image 1 has been replaced, old image has been deleted');
      // const image1Ref = firebase.storage().refFromURL(querySnapshot.data().imageUri1);
      // image1Ref.delete().then(() => {
      //   console.log('Image 1 has been deleted!');
      // }).catch((err) => {
      //   console.log(err);
      // });
    }
  }
  if (NEWitem.imageUri2) {
    const image2Ref = firebase.storage().refFromURL(querySnapshot.data().imageUri2);
    image2Ref.delete().then(() => {
      console.log('Image 2 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
  }
  if (NEWitem.imageUri3) {
    const image3Ref = firebase.storage().refFromURL(querySnapshot.data().imageUri3);
    image3Ref.delete().then(() => {
      console.log('Image 3 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
  }
  activesRef.doc(oldID).set(NEWitem, { merge: true })
    .then(() => { console.log('updateActive Successful'); });
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
      imageUri1: doc.data().imageUri1,
      startTimeWeekday: dateToWeekday(doc.data().startTime),
      startTimeInNum: toDateString(doc.data().startTime),
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
  // console.log(activeArray);
  console.log('getAllActive Successful');
  return activeArray;
}

async function getOneActive(id) {
  const db = firebase.firestore();
  const activesRef = db.collection('actives').doc(id);

  const querySnapshot = await activesRef.get();
  const oneactive = {
    id: querySnapshot.id,
    name: querySnapshot.data().name,
    imageUri1: querySnapshot.data().imageUri1,
    startTimeInNum: toDateString(querySnapshot.data().startTime),
    endTimeInNum: toDateString(querySnapshot.data().endTime),
    startTimeWeekday: dateToWeekday(querySnapshot.data().startTime),
    endTimeWeekday: dateToWeekday(querySnapshot.data().endTime),
    place: querySnapshot.data().place,
    cost: querySnapshot.data().cost,
    limitNum: querySnapshot.data().limitNum,
    genre: querySnapshot.data().genre,
    genreIndex: querySnapshot.data().genreIndex,
    link: querySnapshot.data().link,
    hostName: querySnapshot.data().hostName,
    hostPhone: querySnapshot.data().hostPhone,
    hostMail: querySnapshot.data().hostMail,
    details: querySnapshot.data().details,
  };
  if (querySnapshot.data().imageUri2) {
    oneactive.imageUri2 = querySnapshot.data().imageUri2;
  }
  if (querySnapshot.data().imageUri3) {
    oneactive.imageUri3 = querySnapshot.data().imageUri3;
  }
  console.log(oneactive);

  console.log('getOneActive Successful');

  return [oneactive];
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
      imageUri1: doc.data().imageUri1,
      imageUri2: doc.data().imageUri2,
      imageUri3: doc.data().imageUri3,
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
  console.log('getGenreActive Successful');
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

async function deleteOneActive(deleteDocId) {
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const deletedDoc = await activesRef.doc(deleteDocId).get();
  if (deletedDoc.data().imageUri1 !== defaultLinks[values.indexOf(deletedDoc.data().genre)].link) {
    if (deletedDoc.data().imageUri1) {
      const image1Ref = firebase.storage().refFromURL(deletedDoc.data().imageUri1);
      image1Ref.delete().then(() => {
        console.log('Image 1 has been deleted!');
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  if (deletedDoc.data().imageUri2) {
    const image2Ref = firebase.storage().refFromURL(deletedDoc.data().imageUri2);
    image2Ref.delete().then(() => {
      console.log('Image 2 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
  }
  if (deletedDoc.data().imageUri3) {
    const image3Ref = firebase.storage().refFromURL(deletedDoc.data().imageUri3);
    image3Ref.delete().then(() => {
      console.log('Image 3 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
  }
  activesRef.doc(deleteDocId).delete();

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

async function deleteAllAttendees() {
  const db = firebase.firestore();
  const attendeesRef = db.collection('attendees');

  const querySnapshot = await attendeesRef.get();
  querySnapshot.forEach((doc) => {
    db.collection('attendees').doc(doc.id).delete();
  });

  console.log('deleteAllAttendees Successful');
}

async function addUser() {
  const db = firebase.firestore();
  const attendeeRef = db.collection('attendees');
  const memberInfo = {
    BasicInfo: {
      studentID: '111403523',
      name: '王曉明',
      major: '資管系',
      grade: 3,
      phone: '0905123456',
      email: 'soongraduate@gmail.com',
      avatar: 'https://firebasestorage.googleapis.com/v0/b/active-e1014.appspot.com/o/actives%2FAImKb4m8BxsM3lIyYBDCGJBWH6lXBB3FB9LZveoRoq1NsgarKrRJO5jdwBDNhlb-8AwXkOfVAf2a2x12HxONG-8%3Dw1280?alt=media&token=3d70e398-e41f-45a0-bd71-402a83ee9482',
    },
    hostedEvent: {
      1: 'Sc4ZV6kUCgDhW7aEK4DC',
      2: 'FS3QFcyrTJ8WDAi100MR',
    },
    participatedEvent: {
      1: 'vxGU7JJEPKdrmxIBrxQV',
    },
  };

  attendeeRef.doc('110403523').set(memberInfo, { merge: true }).then(console.log('succeed'));
  const result = await attendeeRef.get();
  result.forEach((doc) => console.log(doc.data()));
}

async function getHostedEvent() {
  const hostID = '110403523';
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const hostArray = [];

  activesRef.doc('Sc4ZV6kUCgDhW7aEK4DC').set({ hostID: '110403523' }, { merge: true });
  activesRef.doc('FS3QFcyrTJ8WDAi100MR').set({ hostID: '110403523' }, { merge: true });

  const querySnapshot = await activesRef.orderBy('uploadTime', 'desc').get();
  querySnapshot.forEach((doc) => {
    if (doc.data().hostID === hostID) {
      hostArray.push({
        id: doc.id,
        name: doc.data().name,
        imageUri1: doc.data().imageUri1,
        startTimeWeekday: dateToWeekday(doc.data().startTime),
        startTimeInNum: toDateString(doc.data().startTime),
        place: doc.data().place,
        cost: doc.data().cost,
        limitNum: doc.data().limitNum,
        genre: doc.data().genre,
        link: doc.data().link,
        hostID: doc.data().hostID,
        hostName: doc.data().hostName,
        hostPhone: doc.data().hostPhone,
        hostMail: doc.data().hostMail,
        details: doc.data().details,
      });
    }
  });

  return hostArray;
}

async function signUp() {
  const attendeesID = '110403523';
  const db = firebase.firestore();
  const activesRef = db.collection('actives').doc('jm1VZceUTuhU74A2HBuA').collection('attendees');
  const attendeeRef = db.collection('attendees');
  const result = await attendeeRef.doc(attendeesID).get();
  // console.log(result.data().BasicInfo.name);
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
  toDateString,
  addActive,
  updateActive,
  getAllActive,
  getGenreActive,
  deleteOneActive,
  getOneActive,
  deleteAllActive,
  getActiveByName,
  fuseSearchName,
  sentMessage,
  addUser,
  signUp,
  deleteAllAttendees,
  getHostedEvent,
};
