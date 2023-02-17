import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, query, getDoc, getDocs, addDoc, where, setDoc, doc, deleteDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import UserController from './getStudentId';

const firebaseConfig = {
  apiKey: 'AIzaSyA8GH6yj1i4gJM0H_ZTsurYG3Dqn4-nIS8',
  authDomain: 'ncu-app-test.firebaseapp.com',
  projectId: 'ncu-app-test',
  storageBucket: 'ncu-app-test.appspot.com',
  messagingSenderId: '739839700130',
  appId: '1:739839700130:web:37591d0118a440488cfbfb',
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function toDateString(time) {
  const date = new Date(time * 1000);
  const dateString = `${date.getFullYear().toString() - 1969}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getDate().toString().padStart(2, '0')}  ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}`;
  return dateString;
}

function getHoursMin(time) {
  const date = new Date(time * 1000);
  if (date.getHours().toString().padStart(2, '0') > 12) {
    return `下午${
      date.getHours().toString().padStart(2, '0')}:${
      date.getMinutes().toString().padStart(2, '0')}`;
  }
  return `上午${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}`;
}

function newMessageTime(time) {
  const date = new Date(time * 1000);
  const current = new Date();
  const dateString = `${date.getFullYear().toString() - 1969}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getDate().toString().padStart(2, '0')}  ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}`;
  if (current.getFullYear() > date.getFullYear() - 1969) { // 今年以前
    return `${date.getFullYear().toString() - 1969}/${
      (date.getMonth() + 1).toString().padStart(2, '0')}/${
      date.getDate().toString().padStart(2, '0')}`;
  } if (current.getDate() === date.getDate() && date.getMonth() === current.getMonth()) { // 今天
    if (date.getHours().toString().padStart(2, '0') > 12) {
      return `下午${
        date.getHours().toString().padStart(2, '0')}:${
        date.getMinutes().toString().padStart(2, '0')}`;
    }
    return `上午${
      date.getHours().toString().padStart(2, '0')}:${
      date.getMinutes().toString().padStart(2, '0')}`;
  } if (current.getDate() - 1 === date.getDate() && date.getMonth() === current.getMonth()) { // 昨天
    return '昨天';
  }
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getDate().toString().padStart(2, '0')}`;
}

function imagePos(imageUri) {
  return imageUri.split('/').pop();
}

async function addMessage(messageData, userUid) {
  const item = {
    send: messageData.send.trim(),
    receive: messageData.receive.trim(),
    sendTime: messageData.sendTime,
  };
  if (messageData.send.trim() === userUid) {
    item.readForSender = true;
    item.readForReceiver = false;
  }
  if (messageData.message) {
    item.message = messageData.message;
    item.image = '';
  } else if (messageData.image) {
    const imageAddress = `message/${imagePos(messageData.image)}`;
    const storageRef = ref(storage, imageAddress);
    const response = await fetch(messageData.image);
    const blob = await response.blob();
    const uploadTask = await uploadBytes(storageRef, blob);
    const uri = await getDownloadURL(uploadTask.ref);

    if (uri !== undefined) {
      item.image = uri;
    } else {
      item.image = '';
    }
    item.message = '';
  }
  const db = getFirestore(app);
  const messageRef = query(collection(db, 'message'));
  addDoc(messageRef, item).then(() => {
    console.log('message sent successfully!');
  })
    .catch((error) => {
      console.log(error);
    });
}

async function getRelativeMessage(user, other) {
  const db = getFirestore(app);
  const messageRef1 = query(collection(db, 'message'), where('send', '==', user));
  const messageRef2 = query(collection(db, 'message'), where('receive', '==', user));
  const message = [];
  const querySnapshot1 = await getDocs(messageRef1);
  querySnapshot1.forEach((doc1) => {
    if (doc1.data().receive === other) {
      message.push({
        id: doc1.id,
        image: doc1.data().image,
        message: doc1.data().message,
        readForSender: doc1.data().readForSender,
        readForReceiver: doc1.data().readForReceiver,
        send: doc1.data().send,
        receive: doc1.data().receive,
        sendTime: doc1.data().sendTime,
      });
    }
  });
  const querySnapshot2 = await getDocs(messageRef2);
  querySnapshot2.forEach((doc2) => {
    if (doc2.data().send === other) {
      setDoc(doc(db, `message/${doc2.id}`), { readForReceiver: true }, { merge: true });
      message.push({
        id: doc2.id,
        image: doc2.data().image,
        message: doc2.data().message,
        readForSender: doc2.data().readForSender,
        readForReceiver: doc2.data().readForReceiver,
        send: doc2.data().send,
        receive: doc2.data().receive,
        sendTime: doc2.data().sendTime,
      });
    }
  });
  message.sort((a, b) => a.sendTime - b.sendTime);
  return message;
}

async function getRelativeMessageTime(user, other) {
  const db = getFirestore(app);
  const messageRef1 = query(collection(db, 'message'), where('send', '==', user));
  const messageRef2 = query(collection(db, 'message'), where('receive', '==', user));
  const time = [];
  const querySnapshot1 = await getDocs(messageRef1);
  querySnapshot1.forEach((doc1) => {
    if (doc1.data().receive === other) {
      time.push({
        sendTime: doc1.data().sendTime,
      });
    }
  });
  const querySnapshot2 = await getDocs(messageRef2);
  querySnapshot2.forEach((doc2) => {
    if (doc2.data().send === other) {
      time.push({
        sendTime: doc2.data().sendTime,
      });
    }
  });
  time.sort((a, b) => a.sendTime - b.sendTime);
  const uniquetime = [...new Set(time)];
  return uniquetime;
}

async function getNewestMessage(user, other) {
  const db = getFirestore(app);
  const otherRef = await getDoc(doc(db, `attendees/${other}`));
  const messageRef1 = query(collection(db, 'message'), where('send', '==', user));
  const messageRef2 = query(collection(db, 'message'), where('receive', '==', user));
  const message = [];
  const querySnapshot1 = await getDocs(messageRef1);
  querySnapshot1.forEach((doc1) => {
    if (doc1.data().receive === other) {
      message.push({
        ...otherRef.data(),
        id: doc1.id,
        image: doc1.data().image,
        message: doc1.data().message,
        readForSender: doc1.data().readForSender,
        readForReceiver: doc1.data().readForReceiver,
        send: doc1.data().send,
        receive: doc1.data().receive,
        sendTime: doc1.data().sendTime,
        read: true,
        othersUid: doc1.data().receive,
      });
    }
  });
  const querySnapshot2 = await getDocs(messageRef2);
  querySnapshot2.forEach((doc2) => {
    if (doc2.data().send === other) {
      message.push({
        ...otherRef.data(),
        id: doc2.id,
        image: doc2.data().image,
        message: doc2.data().message,
        readForSender: doc2.data().readForSender,
        readForReceiver: doc2.data().readForReceiver,
        send: doc2.data().send,
        receive: doc2.data().receive,
        sendTime: doc2.data().sendTime,
        read: doc2.data().readForReceiver,
        othersUid: doc2.data().send,
      });
    }
  });
  message.sort((a, b) => a.sendTime - b.sendTime);
  const last = message.pop();
  if (last.message === '' && last.image) {
    last.message = '他傳送了一張照片';
  }
  return last;
}

async function getMessagePerson(userUid) {
  const db = getFirestore(app);
  const messageRef1 = query(collection(db, 'message'), where('send', '==', userUid));
  const messageRef2 = query(collection(db, 'message'), where('receive', '==', userUid));
  const infoRef = query(collection(db, 'attendees'));
  const person = [];
  const querySnapshot1 = await getDocs(messageRef1);
  querySnapshot1.forEach((doc1) => {
    if (doc1.data().receive !== userUid) {
      person.push(doc1.data().receive);
    }
  });
  const querySnapshot2 = await getDocs(messageRef2);
  querySnapshot2.forEach((doc2) => {
    if (doc2.data().send !== userUid) {
      person.push(doc2.data().send);
    }
  });
  const uniquePerson = [...new Set(person)];
  // console.log(uniquePerson);
  const querySnapshot = await getDocs(infoRef);
  const info = [];
  uniquePerson.forEach((one) => {
    querySnapshot.forEach((doc3) => {
      if (doc3.id === one) {
        info.push({ othersUid: doc3.id, ...doc3.data() });
      }
    });
  });
  // console.log('person', info);
  return info;
}

async function Notification(notifymessage, eventID) {
  const UserStudent = UserController.getUid();
  const db = getFirestore(app);
  const infoRef = query(collection(db, 'attendees'));
  const messageRef = query(collection(db, 'message'));
  const eventInfo = await getDoc(doc(db, `active/${eventID}`));

  const querySnapshot = await getDocs(infoRef);
  const attendeeList = [];
  const sendList = [];
  querySnapshot.forEach((attendee) => {
    attendeeList.push(attendee.id);
  });
  for (let i = 0; i < attendeeList.length; i += 1) {
    const resultRef = query(collection(db, 'attendees', attendeeList[i], 'attendedEvent'));
    const result = await getDocs(resultRef);
    result.forEach((event) => {
      if (event.id === eventInfo.id) {
        sendList.push(attendeeList[i]);
      }
    });
  }
  for (let i = 0; i < sendList.length; i += 1) {
    const item = {
      send: UserStudent,
      receive: sendList[i],
      sendTime: new Date(),
      readForSender: true,
      readForReceiver: false,
      message: notifymessage,
      image: '',
    };
    console.log(item);
    addDoc(messageRef, item).then(() => {
      console.log('inform everybody successfully!');
    })
      .catch((error) => {
        console.log(error);
      });
  }
}

async function deleteMessage(messageID) {
  const db = getFirestore(app);
  const deletedDoc = await getDoc(doc(db, `message/${messageID}`));
  if (deletedDoc.data().image !== '') {
    const imageRef = ref(storage, `message/${deletedDoc.data().imageUri1.substr(-94, 41)}`);
    deleteObject(imageRef).then(() => {
      console.log('origin image1 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
    await deleteDoc(doc(db, 'message', messageID));
    // console.log('deleteMessage Successful');
  } else {
    await deleteDoc(doc(db, 'message', messageID));
    // console.log('deleteMessage Successful');
  }
}

async function countUnreadMessage(uid) {
  const db = getFirestore(app);
  const messageRef1 = query(collection(db, 'message'), where('receive', '==', uid));
  let messagecount = 0;
  const querySnapshot = await getDocs(messageRef1);
  querySnapshot.forEach((doc1) => {
    if (doc1.data().readForReceiver === false) {
      messagecount += 1;
    }
  });
  console.log(uid, 'unread message quantity:', messagecount);
  return messagecount;
}

export default {
  firebaseConfig,
  getHoursMin,
  newMessageTime,
  toDateString,
  addMessage,
  getNewestMessage,
  getRelativeMessage,
  getRelativeMessageTime,
  getMessagePerson,
  Notification,
  deleteMessage,
  countUnreadMessage,
};
