import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, query, getDoc, getDocs, addDoc, where, setDoc, doc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
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
    item.readForUser = true;
    item.readForOthers = false;
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
  const messageRef = query(collection(db, 'message'));
  const message = [];
  const querySnapshot1 = await getDocs(messageRef, where('send', '==', user));
  querySnapshot1.forEach((doc1) => {
    if (doc1.data().receive === other) {
      message.push({
        id: doc1.id,
        image: doc1.data().image,
        message: doc1.data().message,
        readForUser: doc1.data().readForUser,
        readForOthers: doc1.data().readForOthers,
        send: doc1.data().send,
        receive: doc1.data().receive,
        sendTime: doc1.data().sendTime,
      });
    }
  });
  const querySnapshot2 = await getDocs(messageRef, where('receive', '==', user));
  querySnapshot2.forEach((doc2) => {
    if (doc2.data().send === other) {
      setDoc(doc(db, 'message', `${doc2.id}`), { readForOthers: true }, { merge: true });
      message.push({
        id: doc2.id,
        image: doc2.data().image,
        message: doc2.data().message,
        readForUser: doc2.data().readForUser,
        readForOthers: doc2.data().readForOthers,
        send: doc2.data().send,
        receive: doc2.data().receive,
        sendTime: doc2.data().sendTime,
      });
    }
  });
  message.sort((a, b) => a.sendTime - b.sendTime);
  return message;
}

async function getNewestMessage(user, other) {
  const db = getFirestore(app);
  const messageRef = query(collection(db, 'message'));
  const message = [];
  const querySnapshot1 = await getDocs(messageRef, where('send', '==', user));
  querySnapshot1.forEach((doc1) => {
    if (doc1.data().receive === other) {
      message.push({
        id: doc1.id,
        image: doc1.data().image,
        message: doc1.data().message,
        readForUser: doc1.data().readForUser,
        readForOthers: doc1.data().readForOthers,
        send: doc1.data().send,
        receive: doc1.data().receive,
        sendTime: doc1.data().sendTime,
      });
    }
  });
  const querySnapshot2 = await getDocs(messageRef, where('receive', '==', user));
  querySnapshot2.forEach((doc2) => {
    if (doc2.data().send === other) {
      message.push({
        id: doc2.id,
        image: doc2.data().image,
        message: doc2.data().message,
        readForUser: doc2.data().readForUser,
        readForOthers: doc2.data().readForOthers,
        send: doc2.data().send,
        receive: doc2.data().receive,
        sendTime: doc2.data().sendTime,
      });
    }
  });
  message.sort((a, b) => a.sendTime - b.sendTime);
  const last = message.pop();
  if (last.message === '' && last.image) {
    last.message = '他傳送了一張照片';
  }
  console.log(last);
  return last;
}

async function getMessagePerson(user) {
  const db = getFirestore(app);
  const messageRef = query(collection(db, 'message'));
  const infoRef = query(collection(db, 'attendees'));
  const person = [];
  const querySnapshot1 = await getDocs(messageRef, where('send', '==', user));
  querySnapshot1.forEach((doc1) => {
    if (doc1.data().receive !== user) {
      person.push(doc1.data().receive);
    }
  });
  const querySnapshot2 = await getDocs(messageRef, where('receive', '==', user));
  querySnapshot2.forEach((doc2) => {
    if (doc2.data().send !== user) {
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
  console.log('person', info);
  return info;
}

async function Notification(notifymessage, eventID) {
  const UserStudent = UserController.getUid();
  const db = getFirestore(app);
  const infoRef = query(collection(db, 'attendees'));
  const messageRef = query(collection(db, 'message'));
  const eventInfo = await getDoc(collection(db, `active/${eventID}`));

  const querySnapshot = await getDocs(infoRef);
  const attendeeList = [];
  const sendList = [];
  querySnapshot.forEach((attendee) => {
    attendeeList.push(attendee.id);
  });
  for (let i = 0; i < attendeeList.length; i += 1) {
    const result = await getDocs(infoRef, attendeeList[i], 'attendedEvent');
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
      readForUser: true,
      readForOthers: false,
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
  const messageRef = query(collection(db, 'message'));
  const deletedDoc = await getDoc(collection(db, `message/${messageID}`));
  if (deletedDoc.data().image !== '') {
    const image = refFromURL(deletedDoc.data().image);
    image.delete().then(() => {
      console.log('image has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
    messageRef.doc(messageID).delete();
    // console.log('deleteMessage Successful');
  } else {
    messageRef.doc(messageID).delete();
    // console.log('deleteMessage Successful');
  }
}

async function countUnreadMessage() {
  const UserStudent = UserController.getUid();
  const db = getFirestore(app);
  const messageRef = query(collection(db, 'message'));
  const message = [];
  const querySnapshot = await getDocs(messageRef, where('receive', '==', UserStudent));
  querySnapshot.forEach((doc1) => {
    if (doc1.data().readForUser === false) {
      message.push({
        id: doc1.id,
        image: doc1.data().image,
        message: doc1.data().message,
        readForUser: doc1.data().readForUser,
        readForOthers: doc1.data().readForOthers,
        send: doc1.data().send,
        receive: doc1.data().receive,
        sendTime: doc1.data().sendTime,
      });
    }
  });
  console.log('message quantity: ', message.length);
  return message.length;
}

export default {
  firebaseConfig,
  addMessage,
  getNewestMessage,
  getRelativeMessage,
  getMessagePerson,
  Notification,
  deleteMessage,
  countUnreadMessage,
};
