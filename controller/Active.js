import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, query, getDoc, getDocs, addDoc,
  setDoc, doc, orderBy, where, deleteDoc, deleteField, updateDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import Fuse from 'fuse.js';
import UserController from './getStudentId';

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

const firebaseConfig = {
  apiKey: 'AIzaSyA8GH6yj1i4gJM0H_ZTsurYG3Dqn4-nIS8',
  authDomain: 'ncu-app-test.firebaseapp.com',
  projectId: 'ncu-app-test',
  storageBucket: 'ncu-app-test.appspot.com',
  messagingSenderId: '739839700130',
  appId: '1:739839700130:web:37591d0118a440488cfbfb',
};
const app = initializeApp(firebaseConfig);
const storage = getStorage();

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
  const UserStudent = UserController.getUid();
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
    const storageRef = ref(storage, imageAddress);
    const response = await fetch(active.image1);
    const blob = await response.blob();
    const uploadTask = await uploadBytes(storageRef, blob);
    item.imageUri1 = await getDownloadURL(uploadTask.ref);
  } else {
    item.imageUri1 = defaultLinks[values.indexOf(active.genre)].link;
  }

  if (active.image2) {
    const imageAddress = `actives/${imagePos(active.image2)}`;
    const storageRef = ref(storage, imageAddress);
    const response = await fetch(active.image2);
    const blob = await response.blob();
    const uploadTask = await uploadBytes(storageRef, blob);
    item.imageUri2 = await getDownloadURL(uploadTask.ref);
  }
  if (active.image3) {
    const imageAddress = `actives/${imagePos(active.image3)}`;
    const storageRef = ref(storage, imageAddress);
    const response = await fetch(active.image3);
    const blob = await response.blob();
    const uploadTask = await uploadBytes(storageRef, blob);
    item.imageUri3 = await getDownloadURL(uploadTask.ref);
  }

  if (active.cost === 0 || active.cost === '') {
    item.cost = '免費free';
  }
  const db = getFirestore(app);
  const activesRef = query(collection(db, 'actives'));
  addDoc(activesRef, item).then(() => {
    console.log('Document has been added successfully');
  }).catch((error) => {
    console.log(error);
  });
  const querySnapshot = await getDocs(collection(db, 'actives'));
  querySnapshot.forEach((doc1) => {
    if (doc1.data().name === item.name) {
      setDoc(doc(db, 'attendees', `${UserStudent}`, 'hostedEvent', `${doc1.id}`), {}, { merge: true });
    }
  });

  // console.log(item);
  console.log('addActive Successful');
}

/**
 *
 * @param {*} oldID
 * @param {*} NEWactive
 */
async function updateActive(oldID, NEWactive) {
  let defaultRef;

  const NEWitem = NEWactive;
  console.log(NEWitem);
  const db = getFirestore(app);
  const activesRef = doc(db, `actives/${oldID}`);
  const querySnapshot = await getDoc(activesRef);
  if (NEWactive.genre) {
    defaultRef = defaultLinks[values.indexOf(NEWactive.genre)].link;
  } else {
    defaultRef = defaultLinks[values.indexOf(querySnapshot.data().genre)].link;
  }

  // 狀況1: 主辦者沒有上傳新照片 && 換了分類 && 原本照片是上個分類的預設照片
  if (!NEWactive.image1 && NEWactive.genre && querySnapshot.data().imageUri1 === defaultLinks[values.indexOf(querySnapshot.data().genre)].link) {
    console.log('status 1: new genre link');
    NEWitem.imageUri1 = defaultRef;
    delete NEWitem.image1;
  }
  // 狀況2: 主辦者希望用預設照片
  else if (NEWactive.image1 === values.indexOf(querySnapshot.data().genre) || NEWactive.image1 === values.indexOf(NEWactive.genre)) {
    console.log('status 2: use default image');
    NEWitem.imageUri1 = defaultRef;
    delete NEWitem.image1;
  }
  // 狀況3: 主辦者第一張照片換了
  else if (NEWactive.image1) {
    if (NEWactive.image2 === 'forward') { // 如果是第二張照片往前補
      delete NEWitem.image1;
      delete NEWitem.image2;
      const docRef = doc(db, 'actives', oldID);
      const data = {
        imageUri1: NEWactive.image1,
        imageUri2: deleteField(),
      };
      await updateDoc(docRef, data, { merge: true });
    } else {
      const imageAddress = `actives/${imagePos(NEWactive.image1)}`;
      const storageRef = ref(storage, imageAddress);
      const response = await fetch(NEWactive.image1);
      const blob = await response.blob();
      const uploadTask = await uploadBytes(storageRef, blob);
      NEWitem.imageUri1 = await getDownloadURL(uploadTask.ref);
      if (querySnapshot.data().imageUri1 !== defaultLinks[values.indexOf(querySnapshot.data().genre)].link) {
        const deleteRef = ref(storage, `actives/${querySnapshot.data().imageUri1.substr(-94, 41)}`);
        deleteObject(deleteRef).then(() => {
          console.log('origin image1 has been deleted!');
        }).catch((err) => {
          console.log(err);
        });
      }
    }
    delete NEWitem.image1;
    console.log('status 3: image 1 changed');
  }

  if (NEWactive.image2 === 'removed') {
    delete NEWitem.image2;
    const deleteRef = ref(storage, `actives/${querySnapshot.data().imageUri2.substr(-94, 41)}`);
    deleteObject(deleteRef).then(() => {
      console.log('origin image2 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
  } else if (NEWactive.image3 === 'forward') {
    delete NEWitem.image2;
    delete NEWitem.image3;
    const docRef = doc(db, 'actives', oldID);
    const data = {
      imageUri2: NEWactive.image2,
      imageUri3: deleteField(),
    };
    await updateDoc(docRef, data, { merge: true });
  } else if (NEWactive.image2 !== undefined) {
    const imageAddress = `actives/${imagePos(NEWactive.image2)}`;
    const storageRef = ref(storage, imageAddress);
    const response = await fetch(NEWactive.image2);
    const blob = await response.blob();
    const uploadTask = await uploadBytes(storageRef, blob);
    NEWitem.imageUri2 = await getDownloadURL(uploadTask.ref);
    const deleteRef = ref(storage, `actives/${querySnapshot.data().imageUri2.substr(-94, 41)}`);
    deleteObject(deleteRef).then(() => {
      console.log('origin image2 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
    delete NEWitem.image2;
  }

  if (NEWactive.image3 === 'removed') {
    delete NEWitem.image3;
    const deleteRef = ref(storage, `actives/${querySnapshot.data().imageUri3.substr(-94, 41)}`);
    deleteObject(deleteRef).then(() => {
      console.log('origin image2 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
  } else if (NEWactive.image3 !== undefined) {
    const imageAddress = `actives/${imagePos(NEWactive.image3)}`;
    const storageRef = ref(storage, imageAddress);
    const response = await fetch(NEWactive.image3);
    const blob = await response.blob();
    const uploadTask = await uploadBytes(storageRef, blob);
    NEWitem.imageUri3 = await getDownloadURL(uploadTask.ref);
    const deleteRef = ref(storage, `actives/${querySnapshot.data().imageUri3.substr(-94, 41)}`);
    deleteObject(deleteRef).then(() => {
      console.log('origin image2 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
    delete NEWitem.image3;
  }

  if (NEWactive.cost) {
    if (NEWactive.cost === 0 || NEWactive.cost === '') {
      NEWitem.cost = '免費free';
    }
  }

  console.log(NEWitem);
  if (NEWitem) {
    setDoc(activesRef, NEWitem, { merge: true })
      .then(() => { console.log('updateActive Successful'); });
  }
}

async function getAllActive() {
  const db = getFirestore(app);
  const activesRef = query(collection(db, 'actives'), orderBy('uploadTime', 'desc'));
  const activeArray = [];
  const querySnapshot = await getDocs(activesRef);
  querySnapshot.forEach((doc1) => {
    activeArray.push({
      id: doc1.id,
      name: doc1.data().name,
      imageUri1: doc1.data().imageUri1,
      startTimeWeekday: dateToWeekday(doc1.data().startTime),
      startTimeInNum: toDateString(doc1.data().startTime),
      place: doc1.data().place,
      cost: doc1.data().cost,
      limitNum: doc1.data().limitNum,
      genre: doc1.data().genre,
      link: doc1.data().link,
      hostName: doc1.data().hostName,
      hostPhone: doc1.data().hostPhone,
      hostMail: doc1.data().hostMail,
      details: doc1.data().details,
    });
  });
  // console.log(activeArray);
  console.log('getAllActive Successful');
  return activeArray;
}

async function getGenreActive(genre) {
  const db = getFirestore(app);
  const activesRef = query(collection(db, 'actives'));
  const GenreArray = [];
  const querySnapshot = await getDocs(activesRef, where('genre', '==', genre));

  querySnapshot.forEach((doc1) => {
    GenreArray.push({
      id: doc1.id,
      name: doc1.data().name,
      imageUri1: doc1.data().imageUri1,
      imageUri2: doc1.data().imageUri2,
      imageUri3: doc1.data().imageUri3,
      startTime: toDateString(doc1.data().startTime),
      endTime: toDateString(doc1.data().endTime),
      startTimeWeekday: dateToWeekday(doc1.data().startTime),
      endTimeWeekday: dateToWeekday(doc1.data().endTime),
      place: doc1.data().place,
      cost: doc1.data().cost,
      limitNum: doc1.data().limitNum,
      genre: doc1.data().genre,
      link: doc1.data().link,
      hostName: doc1.data().hostName,
      hostPhone: doc1.data().hostPhone,
      hostMail: doc1.data().hostMail,
      details: doc1.data().details,
    });
  });
  // console.log(GenreArray);
  console.log('getGenreActive Successful');
  return GenreArray;
}

async function getParticipatedActive() {
  const UserStudent = await UserController.getUid();
  // console.log(UserStudent.studentID);
  const db = getFirestore(app);
  const attendRef = query(collection(db, `attendees/${UserStudent}/attendedEvent`));
  const attendIDArray = [];
  const activeArray = [];
  const current = new Date();
  const querySnapshot = await getDocs(attendRef);
  querySnapshot.forEach((attendID) => {
    attendIDArray.push(attendID.id);
  });
  console.log(attendIDArray);

  for (let i = 0; i < attendIDArray.length; i += 1) {
    const refDoc = doc(db, `actives/${attendIDArray[i]}`);
    const result = await getDoc(refDoc);
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
  const UserStudent = UserController.getUid();
  const db = getFirestore(app);
  // const attendRef = query(collection(`${db}/attendees/${user}/attendedEvent`));
  const attendRef = query(collection(db, `attendees/${UserStudent}/attendedEvent`));
  // const attendDocs = query(collection(attendRef, 'attendedEvent'));
  const attendIDArray = [];
  const activeArray = [];
  const current = new Date();
  const querySnapshot = await getDocs(attendRef);
  querySnapshot.forEach((attendID) => {
    attendIDArray.push(attendID.id);
  });
  for (let i = 0; i < attendIDArray.length; i += 1) {
    const refDoc = doc(db, `actives/${attendIDArray[i]}`);
    const result = await getDoc(refDoc);
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
  const db = getFirestore(app);
  const activesDoc = doc(db, `actives/${id}`);

  const querySnapshot = await getDoc(activesDoc);
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
  // console.log(oneactive);
  console.log('getOneActive Successful');

  return [oneactive];
}

/**
 *
 * @param {*} genre
 * @returns
 */

async function getHangOutActive() {
  const db = getFirestore(app);
  const activesRef = query(collection(db, 'actives'), where('genre', 'in', ['揪人遊戲', '揪人共乘', '揪人運動']));
  const GenreArray = [];
  const querySnapshot = await getDocs(activesRef);
  querySnapshot.forEach((doc1) => {
    GenreArray.push({
      id: doc1.id,
      name: doc1.data().name,
      imageUri1: doc1.data().imageUri1,
      imageUri2: doc1.data().imageUri2,
      imageUri3: doc1.data().imageUri3,
      startTime: toDateString(doc1.data().startTime),
      endTime: toDateString(doc1.data().endTime),
      startTimeWeekday: dateToWeekday(doc1.data().startTime),
      endTimeWeekday: dateToWeekday(doc1.data().endTime),
      place: doc1.data().place,
      cost: doc1.data().cost,
      limitNum: doc1.data().limitNum,
      genre: doc1.data().genre,
      link: doc1.data().link,
      hostName: doc1.data().hostName,
      hostPhone: doc1.data().hostPhone,
      hostMail: doc1.data().hostMail,
      details: doc1.data().details,
    });
  });
  console.log('hangeout');
  // console.log(GenreArray);
  console.log('getHangOutActive Successful');
  return GenreArray;
}

async function getEventActive() {
  const db = getFirestore(app);
  const activesRef = query(collection(db, 'actives'), where('genre', 'in', ['校園活動', '系上活動', '社團活動']));
  const EventArray = [];
  const querySnapshot = await getDocs(activesRef);
  querySnapshot.forEach((doc1) => {
    EventArray.push({
      id: doc1.id,
      name: doc1.data().name,
      imageUri1: doc1.data().imageUri1,
      imageUri2: doc1.data().imageUri2,
      imageUri3: doc1.data().imageUri3,
      startTime: toDateString(doc1.data().startTime),
      endTime: toDateString(doc1.data().endTime),
      startTimeWeekday: dateToWeekday(doc1.data().startTime),
      endTimeWeekday: dateToWeekday(doc1.data().endTime),
      place: doc1.data().place,
      cost: doc1.data().cost,
      limitNum: doc1.data().limitNum,
      genre: doc1.data().genre,
      link: doc1.data().link,
      hostName: doc1.data().hostName,
      hostPhone: doc1.data().hostPhone,
      hostMail: doc1.data().hostMail,
      details: doc1.data().details,
    });
  });
  console.log('event');
  // console.log(EventArray);
  console.log('getEventActive Successful');
  return EventArray;
}

async function deleteOneActive(deleteDocId) {
  const db = getFirestore(app);
  const activesRef = query(collection(db, 'actives'));
  const deletedDoc = await getDocs(activesRef, deleteDocId);
  if (deletedDoc.data().imageUri1 !== defaultLinks[values.indexOf(deletedDoc.data().genre)].link) {
    if (deletedDoc.data().imageUri1) {
      deleteObject(deletedDoc.data().imageUri1).then(() => {
        console.log('Image 1 has been deleted!');
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  if (deletedDoc.data().imageUri2) {
    deleteObject(deletedDoc.data().imageUri2).then(() => {
      console.log('Image 2 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
  }
  if (deletedDoc.data().imageUri3) {
    deleteObject(deletedDoc.data().imageUri3).then(() => {
      console.log('Image 3 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
  }

  await deleteDoc(doc(db, 'actives', deleteDoc));
  console.log('deleteOneActive Successful');
}

async function getTotalOfAttendees(docID) {
  const db = getFirestore(app);
  const totalRef = query(collection(db, 'attendees'));
  const querySnapshot = await getDocs(totalRef);
  const attendeeList = [];
  const total = [];
  querySnapshot.forEach((attendee) => {
    attendeeList.push(attendee.id);
  });
  for (let i = 0; i < attendeeList.length; i += 1) {
    const result = await getDocs(collection(db, `attendees/${attendeeList[i]}/attendedEvent`));
    result.forEach((event) => {
      if (event.id === docID) {
        total.push(attendeeList[i]);
      }
    });
  }
  return total.length;
}

async function getAllAttendees(docID) {
  const db = getFirestore(app);
  const infoRef = query(collection(db, 'attendees'));
  const querySnapshot = await getDocs(infoRef);
  const attendeeList = [];
  const IDlist = [];
  const info = [];
  querySnapshot.forEach((attendee) => {
    attendeeList.push(attendee.id);
  });
  for (let i = 0; i < attendeeList.length; i += 1) {
    const result = await getDocs(collection(db, `attendees/${attendeeList[i]}/attendedEvent`));
    result.forEach((event) => {
      if (event.id === docID) {
        IDlist.push(attendeeList[i]);
      }
    });
  }
  console.log(IDlist);
  for (let j = 0; j < IDlist.length; j += 1) {
    const infoDoc = doc(db, `attendees/${IDlist[j]}`);
    const querySnapshot2 = await getDoc(infoDoc);
    info.push({ uid: querySnapshot2.id, ...querySnapshot2.data() });
  }
  console.log(info);
  return info;
}
async function deleteEverySingleAttendee(docID) {
  const db = getFirestore(app);
  const activesRef = query(collection(db, 'attendees'));
  const querySnapshot = await getDocs(activesRef);
  querySnapshot.forEach(async (student) => {
    await deleteDoc(doc(db, 'attendees', `${student.id}`, 'attendedEvent', `${docID}`));
    await deleteDoc(doc(db, 'attendees', `${student.id}`, 'hostedEvent', `${docID}`));
  });
  console.log('delete successfully!');
}

async function removeAttendee(docID, studentUid) { // remove attendee
  const db = getFirestore(app);
  const activesRef = query(collection(db, `attendees/${studentUid}/attendedEvent`));
  activesRef.doc(docID).delete();
  // console.log(docID, studentID);
  console.log('delete successfully!');
  const result = await getDocs(activesRef);
  result.forEach((doc1) => console.log(doc1.id));
}

async function addUser() {
  const db = getFirestore(app);
  const attendeeRef = query(collection(db, 'attendees'));
  const memberInfo = {
    studentID: '111201512',
    name: '沈思怡',
    major: '英美語文學系',
    grade: 1,
    phone: '0906666888',
    email: 'jintong@4ever.com',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/ncu-app-test.appspot.com/o/avatar%2Fsee.jpg?alt=media&token=38cd1d0d-2b29-44cd-9461-5f9afa354f53',
  };
  const docRef = doc(db, 'attendees', '111201512');

  setDoc(docRef, memberInfo, { merge: true })
    .then(console.log('succeed'));
  const result = await getDocs(attendeeRef);
  result.forEach((doc1) => console.log(doc1.data()));
}

async function getHostedEvent() {
  const UserStudent = UserController.getUid();
  const db = getFirestore(app);
  const Ref = query(collection(db, `attendees/${UserStudent}/hostedEvent`));
  const hostIDArray = [];
  const eventArray = [];
  const querySnapshot = await getDocs(Ref);
  querySnapshot.forEach((doc1) => {
    hostIDArray.push(doc1.id);
  });
  // console.log(hostIDArray);
  for (let i = 0; i < hostIDArray.length; i += 1) {
    const refDoc = doc(db, `actives/${hostIDArray[i]}`);
    const result = await getDoc(refDoc);
    const num = await getTotalOfAttendees(result.id);
    eventArray.push({
      id: result.id,
      ...result.data(),
      num,
    });
  }
  // console.log(eventArray);
  console.log('getHostEvent Successfully');
  return eventArray;
}

async function signUp(docID) {
  const UserStudent = UserController.getUid();
  const db = getFirestore(app);
  const Ref = doc(db, `attendees/${UserStudent}/attendedEvent/${docID}`);
  setDoc(Ref, {})
    .then(() => {
      console.log('sign up successfully!');
    })
    .catch((error) => {
      console.log(error);
    });
  const result = await getDocs(collection(db, `attendees/${UserStudent}/attendedEvent`));
  result.forEach((doc1) => console.log(doc1.id));
}

async function quitEvent(docID) {
  const UserStudent = UserController.getUid();
  const db = getFirestore(app);
  const Ref = doc(db, `attendees/${UserStudent}/attendedEvent/${docID}`);
  deleteDoc(Ref)
    .then(() => {
      console.log('delete successfully!');
    })
    .catch((error) => {
      console.log(error);
    });
  const result = await getDocs(collection(db, `attendees/${UserStudent}/attendedEvent`));
  result.forEach((doc1) => console.log(doc1.id));
}

async function getHostInfo(docID) {
  const db = getFirestore(app);
  const infoRef = query(collection(db, 'attendees'));
  const querySnapshot = await getDocs(infoRef);

  const attendeeList = [];
  const IDlist = [];
  const info = [];
  querySnapshot.forEach((attendee) => {
    attendeeList.push(attendee.id);
  });

  for (let i = 0; i < attendeeList.length; i += 1) {
    const result = await getDocs(collection(db, `attendees/${attendeeList[i]}/hostedEvent`));
    result.forEach((event) => {
      if (event.id === docID) {
        IDlist.push(attendeeList[i]);
      }
    });
  }

  for (let j = 0; j < IDlist.length; j += 1) {
    const querySnapshot2 = await getDoc(doc(db, `attendees/${IDlist[j]}`));
    info.push({ uid: querySnapshot2.id, ...querySnapshot2.data() });
  }
  // console.log(info);
  return info;
}

async function fuseSearchName(searchString) {
  const db = getFirestore(app);
  const activesRef = query(collection(db, 'actives'));
  const activeArray = [];
  const querySnapshot = await getDocs(activesRef);

  querySnapshot.forEach((doc1) => {
    activeArray.push({
      id: doc1.id,
      name: doc1.data().name,
    });
  });

  const options = {
    includeScore: true,
    keys: ['name'],
  };

  const fuse = new Fuse(activeArray, options);
  const result = fuse.search(searchString);
  // console.log(result);
  console.log('Search Successful');
  return result;
}

async function getAttendedOrNot(docID) {
  const UserStudent = UserController.getUid();
  const result = [];
  const db = getFirestore(app);
  const attendRef = query(collection(db, `attendees/${UserStudent}/attendedEvent`));
  const querySnapshot = await getDocs(attendRef);
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

export default {
  firebaseConfig,
  toDateString,
  addActive,
  updateActive,
  getAllActive,
  getGenreActive,
  getParticipatedActive,
  getHostedEvent,
  getFinishedActive,
  getHangOutActive,
  getEventActive,
  deleteOneActive,
  deleteEverySingleAttendee,
  getOneActive,
  fuseSearchName,
  addUser,
  signUp,
  quitEvent,
  getHostInfo,
  getAllAttendees,
  getTotalOfAttendees,
  removeAttendee,
  getAttendedOrNot,
};
