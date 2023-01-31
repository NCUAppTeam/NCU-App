import firebase from 'firebase';
// import storage from '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA8GH6yj1i4gJM0H_ZTsurYG3Dqn4-nIS8',
  authDomain: 'ncu-app-test.firebaseapp.com',
  projectId: 'ncu-app-test',
  storageBucket: 'ncu-app-test.appspot.com',
  messagingSenderId: '739839700130',
  appId: '1:739839700130:web:37591d0118a440488cfbfb',
};

function imagePos(imageUri) {
  return imageUri.split('/').pop();
}

async function addMessage(active) {
  const item = {
    send: active.send.trim(),
    receive: active.receive.trim(),
    sendTime: active.sendTime,
  };
  const db = firebase.firestore();
  if (active.message) {
    item.message = active.message;
    item.image = '';
  } else if (active.image) {
    const imageAddress = `message/${imagePos(active.image)}`;
    const storageRef = firebase.storage().ref().child(imageAddress);
    const response = await fetch(active.image);
    const blob = await response.blob();
    const st = storageRef.put(blob);
    await st;
    const uri = await storageRef.getDownloadURL();
    if (uri !== undefined) {
      item.image = uri;
    } else {
      item.image = '';
    }
    item.message = '';
  }
  const messageRef = db.collection('message');
  messageRef.add(item);
  console.log(item);
}

async function getRelativeMessage(user, attendee) {
  const db = firebase.firestore();
  const messageRef = db.collection('message');
  const message = [];
  const querySnapshot1 = await messageRef.where('send', '==', user).get();
  querySnapshot1.forEach((doc) => {
    if (doc.data().receive === attendee) {
      message.push({
        id: doc.id,
        image: doc.data().image,
        message: doc.data().message,
        send: doc.data().send,
        receive: doc.data().receive,
        sendTime: doc.data().sendTime,
      });
    }
  });
  const querySnapshot2 = await messageRef.where('receive', '==', user).get();
  querySnapshot2.forEach((doc) => {
    if (doc.data().send === attendee) {
      message.push({
        id: doc.id,
        image: doc.data().image,
        message: doc.data().message,
        send: doc.data().send,
        receive: doc.data().receive,
        sendTime: doc.data().sendTime,
      });
    }
  });
  message.sort((a, b) => a.sendTime - b.sendTime);
  return message;
}

async function getNewestMessage(user, attendee) {
  const db = firebase.firestore();
  const messageRef = db.collection('message');
  const message = [];
  const querySnapshot1 = await messageRef.where('send', '==', user).get();
  querySnapshot1.forEach((doc) => {
    if (doc.data().receive === attendee) {
      message.push({
        id: doc.id,
        image: doc.data().image,
        message: doc.data().message,
        send: doc.data().send,
        receive: doc.data().receive,
        sendTime: doc.data().sendTime,
      });
    }
  });
  const querySnapshot2 = await messageRef.where('receive', '==', user).get();
  querySnapshot2.forEach((doc) => {
    if (doc.data().send === attendee) {
      message.push({
        id: doc.id,
        image: doc.data().image,
        message: doc.data().message,
        send: doc.data().send,
        receive: doc.data().receive,
        sendTime: doc.data().sendTime,
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

async function Notification(eventID) {
  const db = firebase.firestore();
  const messageRef = db.collection('message');
  const attendeeRef = db.collection('attendees');
  const sendList = [];
  const querySnapshot1 = await attendeeRef.where(doc.id, '==', eventID).get();
  querySnapshot1.forEach((doc) => {
    if (doc.data().receive === attendee) {
      message.push({
        id: doc.id,
        image: doc.data().image,
        message: doc.data().message,
        send: doc.data().send,
        receive: doc.data().receive,
        sendTime: doc.data().sendTime,
      });
    }
  });
}

export default {
  firebaseConfig,
  addMessage,
  getNewestMessage,
  getRelativeMessage,
};
