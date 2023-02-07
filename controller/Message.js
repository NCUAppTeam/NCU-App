import { initializeApp, firebase } from 'firebase/app';
import {
  getFirestore, collection, query, getDoc, getDocs, addDoc,
  setDoc, updateDoc, doc, orderBy, where, deleteDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL,
  refFromURL,
} from 'firebase/storage';

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

async function addMessage(messageData, userID) {
    const item = {
        send: messageData.send.trim(),
        receive: messageData.receive.trim(),
        sendTime: messageData.sendTime,
      };
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
    const db = getFirestore(app);
    const messageRef = query(collection(db, 'message'));
    messageRef.add(item);
    console.log(item);
  }

  async function getRelativeMessage(user, other) {
    const db = getFirestore(app);
    const messageRef = query(collection(db, 'message'));
    const message = [];
    const querySnapshot1 = await getDocs(messageRef, where('send', '==', user));
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
    const querySnapshot2 = await getDocs(messageRef, where('receive', '==', user));
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
    const db = getFirestore(app);
    const messageRef = query(collection(db, 'message'));
    const message = [];
    const querySnapshot1 = await getDocs(messageRef, where('send', '==', user));
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
    const querySnapshot2 = await getDocs(messageRef, where('receive', '==', user));
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
    const db = getFirestore(app);
    const messageRef = query(collection(db, 'message'));
    const infoRef = query(collection(db, 'attendees'));
    const person = [];
    const querySnapshot1 = await getDocs(messageRef, where('send', '==', user));
    querySnapshot1.forEach((doc) => {
      if (doc.data().receive !== user) {
        person.push(doc.data().receive);
      }
    });
    const querySnapshot2 = await getDocs(messageRef, where('receive', '==', user));
    querySnapshot2.forEach((doc) => {
      if (doc.data().send !== user) {
        person.push(doc.data().send);
      }
    });
    const uniquePerson = [...new Set(person)];
    // console.log(uniquePerson);
    const querySnapshot = await getDocs(infoRef);
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
    const db = getFirestore(app);
    const infoRef = query(collection(db, 'attendees'));
    const messageRef = query(collection(db, 'message'));
    const eventInfo = getDoc(collection(db, `active/${eventID}`));

    const querySnapshot = await getDocs(infoRef);
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
      addDoc(messageRef, item).then(() => {
        console.log('inform everybody successfully!'); 
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function getINFO(ID) {
    const db = getFirestore(app);
    const attendeeRef = query(collection(db, 'attendees'));
    const querySnapshot = await getDocs(attendeeRef);
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

  async function countUnreadMessage(user) {
    const db = getFirestore(app);
    const messageRef = query(collection(db, 'message'));
    const message = [];
    const querySnapshot = await getDocs(messageRef, where('receive', '==', user));
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
    return message.length;
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