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

async function addMessage(messageData, userID) {
  const item = {
    send: messageData.send.trim(),
    receive: messageData.receive.trim(),
    sendTime: messageData.sendTime,
  };
  const db = firebase.firestore();
  if (messageData.send.trim() === userID) {
    item.readForUser = true;
    item.readForOthers = false;
  }
  if (messageData.message) {
    item.message = messageData.message;
    item.image = '';
  } else if (messageData.image) {
    const imageAddress = `message/${imagePos(messageData.image)}`;
    const storageRef = firebase.storage().ref().child(imageAddress);
    const response = await fetch(messageData.image);
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
  // console.log(item);
}

async function getRelativeMessage(user, other) {
  const db = firebase.firestore();
  const messageRef = db.collection('message');
  const message = [];
  const querySnapshot1 = await messageRef.where('send', '==', user).get();
  querySnapshot1.forEach((doc) => {
    if (doc.data().receive === other) {
      message.push({
        id: doc.id,
        image: doc.data().image,
        message: doc.data().message,
        readForUser: doc.data().readForUser,
        readForOthers: doc.data().readForOthers,
        send: doc.data().send,
        receive: doc.data().receive,
        sendTime: doc.data().sendTime,
      });
    }
  });
  const querySnapshot2 = await messageRef.where('receive', '==', user).get();
  querySnapshot2.forEach((doc) => {
    if (doc.data().send === other) {
      messageRef.doc(doc.id).set({
        readForOthers: true,
      }, { merge: true });
      message.push({
        id: doc.id,
        image: doc.data().image,
        message: doc.data().message,
        readForUser: doc.data().readForUser,
        readForOthers: doc.data().readForOthers,
        send: doc.data().send,
        receive: doc.data().receive,
        sendTime: doc.data().sendTime,
      });
    }
  });
  message.sort((a, b) => a.sendTime - b.sendTime);
  return message;
}

async function getNewestMessage(user, other) {
  const db = firebase.firestore();
  const messageRef = db.collection('message');
  const message = [];
  const querySnapshot1 = await messageRef.where('send', '==', user).get();
  querySnapshot1.forEach((doc) => {
    if (doc.data().receive === other) {
      message.push({
        id: doc.id,
        image: doc.data().image,
        message: doc.data().message,
        readForUser: doc.data().readForUser,
        readForOthers: doc.data().readForOthers,
        send: doc.data().send,
        receive: doc.data().receive,
        sendTime: doc.data().sendTime,
      });
    }
  });
  const querySnapshot2 = await messageRef.where('receive', '==', user).get();
  querySnapshot2.forEach((doc) => {
    if (doc.data().send === other) {
      message.push({
        id: doc.id,
        image: doc.data().image,
        message: doc.data().message,
        readForUser: doc.data().readForUser,
        readForOthers: doc.data().readForOthers,
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

async function getMessagePerson(user) {
  const db = firebase.firestore();
  const messageRef = db.collection('message');
  const infoRef = db.collection('attendees');
  const person = [];
  const querySnapshot1 = await messageRef.where('send', '==', user).get();
  querySnapshot1.forEach((doc) => {
    if (doc.data().receive !== user) {
      person.push(doc.data().receive);
    }
  });
  const querySnapshot2 = await messageRef.where('receive', '==', user).get();
  querySnapshot2.forEach((doc) => {
    if (doc.data().send !== user) {
      person.push(doc.data().send);
    }
  });
  const uniquePerson = [...new Set(person)];
  // console.log(uniquePerson);
  const querySnapshot = await infoRef.get();
  const info = [];
  uniquePerson.forEach((one) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().studentID === one) {
        info.push(doc.data());
      }
    });
  });
  return info;
}

async function Notification(notifymessage, eventID) {
  const hostID = '110501444';
  const db = firebase.firestore();
  const infoRef = db.collection('attendees');
  const messageRef = db.collection('message');
  const eventInfo = await db.collection('active').doc(eventID).get();
  const querySnapshot = await infoRef.get();
  const attendeeList = [];
  const sendList = [];
  querySnapshot.forEach((attendee) => {
    attendeeList.push(attendee.id);
  });
  for (let i = 0; i < attendeeList.length; i += 1) {
    const result = await infoRef.doc(attendeeList[i]).collection('attendedEvent').get();
    result.forEach((event) => {
      if (event.id === eventInfo.id) {
        sendList.push(attendeeList[i]);
      }
    });
  }
  for (let i = 0; i < sendList.length; i += 1) {
    const item = {
      send: hostID,
      receive: sendList[i],
      sendTime: new Date(),
      readForUser: true,
      readForOthers: false,
      message: notifymessage,
      image: '',
    };
    console.log(item);
    messageRef.add(item);
    console.log('inform everybody successfully!');
  }
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
async function deleteMessage(messageID) {
  const db = firebase.firestore();
  const messageRef = await db.collection('message');
  const deletedDoc = await messageRef.doc(messageID).get();
  if (deletedDoc.data().image !== '') {
    const image = firebase.storage().refFromURL(deletedDoc.data().image);
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

async function countUnreadMessage(user) {
  const db = firebase.firestore();
  const messageRef = db.collection('message');
  const message = [];
  const querySnapshot = await messageRef.where('receive', '==', user).get();
  querySnapshot.forEach((doc) => {
    if (doc.data().readForOthers === false) {
      message.push({
        id: doc.id,
        image: doc.data().image,
        message: doc.data().message,
        readForUser: doc.data().readForUser,
        readForOthers: doc.data().readForOthers,
        send: doc.data().send,
        receive: doc.data().receive,
        sendTime: doc.data().sendTime,
      });
    }
  });
  console.log('message quantity: ', message.length);
  // return message;
}
export default {
  firebaseConfig,
  addMessage,
  getNewestMessage,
  getRelativeMessage,
  getMessagePerson,
  Notification,
  getINFO,
  deleteMessage,
  countUnreadMessage,
};
