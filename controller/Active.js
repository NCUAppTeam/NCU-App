import firebase from 'firebase';
import Fuse from 'fuse.js';

const values = ['揪人共乘', '揪人運動', '揪人遊戲', '校園活動', '系上活動', '社團活動'];
const defaultLinks = {
  0:
    {
      id: '0',
      type: 'carpool',
      link: 'https://firebasestorage.googleapis.com/v0/b/ncu-app-test.appspot.com/o/actives%2Fcarpool.jpg?alt=media&token=e1486af1-6c69-4079-a0c1-d2071ab3fc5d',
    },
  1:
    {
      id: '1',
      type: 'exercising',
      link: 'https://firebasestorage.googleapis.com/v0/b/ncu-app-test.appspot.com/o/actives%2Fexercising.jpg?alt=media&token=7f6ab5d3-658a-4a18-b05e-7c8f4082d8c6',
    },
  2: {
    id: '2',
    type: 'HangOut',
    link: 'https://firebasestorage.googleapis.com/v0/b/ncu-app-test.appspot.com/o/actives%2Fhangout.jpg?alt=media&token=dc27fce4-572b-430d-8868-51b522a9f523',
  },
  3: {
    id: '3',
    type: 'schoolEvent',
    link: 'https://firebasestorage.googleapis.com/v0/b/ncu-app-test.appspot.com/o/actives%2FschoolEvent.jpg?alt=media&token=7c4fce8e-1d8b-4c36-a227-e73ecba8a56b',
  },
  4: {
    id: '4',
    type: 'tiedEvent',
    link: 'https://firebasestorage.googleapis.com/v0/b/ncu-app-test.appspot.com/o/actives%2FtiedEvent.jpg?alt=media&token=4bb055ea-cbc3-4afd-953e-be38a7104c82',
  },
  5: {
    id: '5',
    type: 'clubEvent',
    link: 'https://firebasestorage.googleapis.com/v0/b/ncu-app-test.appspot.com/o/actives%2FclubEvent.jpg?alt=media&token=3a29c950-b9b7-4d92-8cca-362d4308a4db',
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
  apiKey: 'AIzaSyA8GH6yj1i4gJM0H_ZTsurYG3Dqn4-nIS8',
  authDomain: 'ncu-app-test.firebaseapp.com',
  projectId: 'ncu-app-test',
  storageBucket: 'ncu-app-test.appspot.com',
  messagingSenderId: '739839700130',
  appId: '1:739839700130:web:37591d0118a440488cfbfb',
};

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
  const user = '110501444';
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
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const hostRef = db.collection('attendees').doc(user).collection('hostedEvent');
  activesRef.add(item);

  const querySnapshot = await activesRef.get();
  querySnapshot.forEach((doc) => {
    if (doc.data().name === item.name) {
      hostRef.doc(doc.id).set({});
    }
  });
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

  console.log(NEWitem);
  if (NEWitem.imageUri1) {
    if (querySnapshot.data().imageUri1 !== defaultLinks[values.indexOf(querySnapshot.data().genre)].link) {
      console.log('image 1 has been replaced, old image has been deleted');
      const image1Ref = firebase.storage().refFromURL(querySnapshot.data().imageUri1);
      image1Ref.delete().then(() => {
        console.log('Image 1 has been deleted!');
      }).catch((err) => {
        console.log(err);
      });
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

async function getParticipatedActive() {
  const user = '110501444';
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const attendRef = db.collection('attendees').doc(user).collection('attendedEvent');
  const attendIDArray = [];
  const activeArray = [];
  const current = new Date();
  const querySnapshot = await attendRef.get();
  querySnapshot.forEach((attendID) => {
    attendIDArray.push(attendID.id);
  });

  for (let i = 0; i < attendIDArray.length; i += 1) {
    const result = await activesRef.doc(attendIDArray[i]).get();
    // console.log(attendIDArray[i], new Date(toDateString(result.data().endTime)), current);
    if (new Date(toDateString(result.data().endTime)) > current) {
      activeArray.push({
        id: result.id,
        name: result.data().name,
        imageUri1: result.data().imageUri1,
        startTimeWeekday: dateToWeekday(result.data().startTime),
        startTimeInNum: toDateString(result.data().startTime),
        place: result.data().place,
        cost: result.data().cost,
        limitNum: result.data().limitNum,
        genre: result.data().genre,
        link: result.data().link,
        hostName: result.data().hostName,
        hostPhone: result.data().hostPhone,
        hostMail: result.data().hostMail,
        details: result.data().details,
      });
    }
  }
  // console.log(activeArray);
  console.log('getParticipatedActive Successful');
  return activeArray;
}

async function getFinishedActive() {
  const user = '110501444';
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const attendRef = db.collection('attendees').doc(user).collection('attendedEvent');
  const attendIDArray = [];
  const activeArray = [];
  const current = new Date();
  const querySnapshot = await attendRef.get();
  querySnapshot.forEach((attendID) => {
    attendIDArray.push(attendID.id);
  });

  for (let i = 0; i < attendIDArray.length; i += 1) {
    const result = await activesRef.doc(attendIDArray[i]).get();
    // console.log(attendIDArray[i], new Date(toDateString(result.data().endTime)), current);
    if (new Date(toDateString(result.data().endTime)) < current) {
      activeArray.push({
        id: result.id,
        name: result.data().name,
        imageUri1: result.data().imageUri1,
        startTimeWeekday: dateToWeekday(result.data().startTime),
        startTimeInNum: toDateString(result.data().startTime),
        place: result.data().place,
        cost: result.data().cost,
        limitNum: result.data().limitNum,
        genre: result.data().genre,
        link: result.data().link,
        hostName: result.data().hostName,
        hostPhone: result.data().hostPhone,
        hostMail: result.data().hostMail,
        details: result.data().details,
      });
    }
  }
  // console.log(activeArray);
  console.log('getFinishedActive Successful');
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

async function getHangOutActive() {
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const GenreArray = [];
  const querySnapshot = await activesRef.where('genre', 'in', ['揪人遊戲', '揪人共乘', '揪人運動']).get();
  querySnapshot.forEach((doc) => {
    GenreArray.push({
      id: doc.id,
      name: doc.data().name,
      imageUri1: doc.data().imageUri1,
      imageUri2: doc.data().imageUri2,
      imageUri3: doc.data().imageUri3,
      startTime: toDateString(doc.data().startTime),
      endTime: toDateString(doc.data().endTime),
      startTimeWeekday: dateToWeekday(doc.data().startTime),
      endTimeWeekday: dateToWeekday(doc.data().endTime),
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
  console.log('hangeout');
  console.log(GenreArray);
  console.log('getHangOutActive Successful');
  return GenreArray;
}

async function getEventActive() {
  const db = firebase.firestore();
  const activesRef = db.collection('actives');
  const EventArray = [];
  const querySnapshot = await activesRef.where('genre', 'in', ['校園活動', '系上活動', '社團活動']).get();
  querySnapshot.forEach((doc) => {
    EventArray.push({
      id: doc.id,
      name: doc.data().name,
      imageUri1: doc.data().imageUri1,
      imageUri2: doc.data().imageUri2,
      imageUri3: doc.data().imageUri3,
      startTime: toDateString(doc.data().startTime),
      endTime: toDateString(doc.data().endTime),
      startTimeWeekday: dateToWeekday(doc.data().startTime),
      endTimeWeekday: dateToWeekday(doc.data().endTime),
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
  console.log('event');
  console.log(EventArray);
  console.log('getEventActive Successful');
  return EventArray;
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

async function getTotalOfAttendees(docID) {
  const db = firebase.firestore();
  const totalRef = db.collection('attendees');
  const querySnapshot = await totalRef.get();
  const attendeeList = [];
  const total = [];
  querySnapshot.forEach((attendee) => {
    attendeeList.push(attendee.id);
  });
  for (let i = 0; i < attendeeList.length; i += 1) {
    const result = await totalRef.doc(attendeeList[i]).collection('attendedEvent').get();
    result.forEach((event) => {
      if (event.id === docID) {
        total.push(attendeeList[i]);
      }
    });
  }
  return total.length;
}

async function getAllAttendees(docID) {
  const db = firebase.firestore();
  const infoRef = db.collection('attendees');
  const querySnapshot = await infoRef.get();
  const attendeeList = [];
  const IDlist = [];
  const info = [];
  querySnapshot.forEach((attendee) => {
    attendeeList.push(attendee.id);
  });
  for (let i = 0; i < attendeeList.length; i += 1) {
    const result = await infoRef.doc(attendeeList[i]).collection('attendedEvent').get();
    result.forEach((event) => {
      if (event.id === docID) {
        IDlist.push(attendeeList[i]);
      }
    });
  }
  console.log(IDlist);
  for (let j = 0; j < IDlist.length; j += 1) {
    const querySnapshot2 = await infoRef.doc(IDlist[j]).get();
    info.push(querySnapshot2.data());
  }
  return info;
}
async function deleteEverySingleAttendee(docID) {
  const db = firebase.firestore();
  const activesRef = db.collection('attendees');
  const querySnapshot = await activesRef.get();
  querySnapshot.forEach(async (student) => {
    await activesRef.doc(student.id).collection('attendedEvent').doc(docID).delete();
    await activesRef.doc(student.id).collection('hostedEvent').doc(docID).delete();
  });
  console.log('delete successfully!');
}

async function removeAttendee(docID, studentID) { // remove attendee
  const db = firebase.firestore();
  const activesRef = db.collection('attendees').doc(studentID).collection('attendedEvent');
  activesRef.doc(docID).delete();
  console.log(docID, studentID);
  console.log('delete successfully!');
  const result = await activesRef.get();
  result.forEach((doc) => console.log(doc.id));
}

async function addUser() {
  const db = firebase.firestore();
  const attendeeRef = db.collection('attendees');
  const memberInfo = {
    studentID: '111201512',
    name: '沈思怡',
    major: '英美語文學系',
    grade: 1,
    phone: '0906666888',
    email: 'jintong@4ever.com',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/ncu-app-test.appspot.com/o/avatar%2Fsee.jpg?alt=media&token=38cd1d0d-2b29-44cd-9461-5f9afa354f53',
  };

  attendeeRef.doc('111201512').set(memberInfo, { merge: true }).then(console.log('succeed'));
  const result = await attendeeRef.get();
  result.forEach((doc) => console.log(doc.data()));
}

async function getHostedEvent() {
  const host = '110501444';
  const db = firebase.firestore();
  const Ref = db.collection('attendees').doc(host).collection('hostedEvent');
  const hostIDArray = [];
  const eventArray = [];
  const num = [];
  const querySnapshot = await Ref.get();
  querySnapshot.forEach((doc) => {
    hostIDArray.push(doc.id);
  });
  console.log(hostIDArray);
  for (let i = 0; i < hostIDArray.length; i += 1) {
    const result = await db.collection('actives').doc(hostIDArray[i]).get();
    const num = await getTotalOfAttendees(result.id);
    eventArray.push({
      id: result.id,
      name: result.data().name,
      imageUri1: result.data().imageUri1,
      startTimeWeekday: dateToWeekday(result.data().startTime),
      startTimeInNum: toDateString(result.data().startTime),
      place: result.data().place,
      cost: result.data().cost,
      limitNum: result.data().limitNum,
      genre: result.data().genre,
      link: result.data().link,
      hostID: result.data().hostID,
      hostName: result.data().hostName,
      hostPhone: result.data().hostPhone,
      hostMail: result.data().hostMail,
      details: result.data().details,
      num,
    });
  }
  console.log('getHostEvent Successfully');
  return eventArray;
}

async function signUp(docID) {
  const attendeesID = '110501444';
  const db = firebase.firestore();
  const Ref = db.collection('attendees').doc(attendeesID).collection('attendedEvent');
  Ref.doc(docID).set({});
  console.log('sign up successfully!');
  const result = await Ref.get();
  result.forEach((doc) => console.log(doc.id));
}

async function quitEvent(docID) {
  const attendeesID = '110501444';
  const db = firebase.firestore();
  const Ref = db.collection('attendees').doc(attendeesID).collection('attendedEvent');
  Ref.doc(docID).delete();
  console.log('delete successfully!');
  const result = await Ref.get();
  result.forEach((doc) => console.log(doc.id));
}

async function getHostInfo(docID) {
  const db = firebase.firestore();
  const infoRef = db.collection('attendees');
  const querySnapshot = await infoRef.get();
  const attendeeList = [];
  const IDlist = [];
  const info = [];
  querySnapshot.forEach((attendee) => {
    attendeeList.push(attendee.id);
  });
  for (let i = 0; i < attendeeList.length; i += 1) {
    const result = await infoRef.doc(attendeeList[i]).collection('hostedEvent').get();
    result.forEach((event) => {
      if (event.id === docID) {
        IDlist.push(attendeeList[i]);
      }
    });
  }
  for (let j = 0; j < IDlist.length; j += 1) {
    const querySnapshot2 = await infoRef.doc(IDlist[j]).get();
    info.push(querySnapshot2.data());
  }
  console.log(info);
  return info;
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

async function getAttendedOrNot(docID) {
  const user = '110501444';
  const result = [];
  const db = firebase.firestore();
  const attendRef = db.collection('attendees').doc(user).collection('attendedEvent');
  const querySnapshot = await attendRef.get();
  querySnapshot.forEach((attendID) => {
    if (attendID.id === docID) {
      result.push(docID);
    }
  });
  if (result.length) {
    console.log('getAttendedOrNot Successful');
    return true;
  }
  return false;
}

async function getINFO(ID) {
  const db = firebase.firestore();
  const attendeeRef = db.collection('attendees').doc(ID);
  const querySnapshot = await attendeeRef.get();
  const attendeeInfo = {
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
export default {
  firebaseConfig,
  toDateString,
  addActive,
  updateActive,
  getAllActive,
  getParticipatedActive,
  getHostedEvent,
  getFinishedActive,
  getHangOutActive,
  getEventActive,
  deleteOneActive,
  deleteEverySingleAttendee,
  getOneActive,
  fuseSearchName,
  sentMessage,
  addUser,
  signUp,
  quitEvent,
  getHostInfo,
  getAllAttendees,
  getTotalOfAttendees,
  removeAttendee,
  getAttendedOrNot,
  // getMessage,
  getINFO,
};
