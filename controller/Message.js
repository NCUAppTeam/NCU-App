import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, query, getDoc, getDocs, addDoc,
  where, doc, deleteDoc, setDoc, onSnapshot,
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
  if (time === '') {
    return '';
  }

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

async function addMessage(messageData) {
  const chatroomId = messageData.id.trim();
  const item = {
    sender: messageData.sender.trim(),
    data: messageData.data.trim(),
    type: messageData.type.trim(),
    sendTime: messageData.sendTime,
  };
  if (item.type === 'image') {
    const imageAddress = `message/${imagePos(messageData.data)}`;
    const storageRef = ref(storage, imageAddress);
    const response = await fetch(messageData.data);
    const blob = await response.blob();
    const uploadTask = await uploadBytes(storageRef, blob);
    const uri = await getDownloadURL(uploadTask.ref);

    if (uri !== undefined) {
      item.data = uri;
    }
  }
  const db = getFirestore(app);
  const messageRef = query(collection(db, `chatroom/${chatroomId}/messages`));
  addDoc(messageRef, item).then(() => {
    console.log('message sent successfully!');
  }).catch((error) => {
    console.log(error);
  });
}

async function getRelativeMessage(chatId) {
  const db = getFirestore(app);
  const message = [];

  const chatText = await getDocs(collection(db, `chatroom/${chatId}/messages`));
  chatText.forEach((chat) => {
    message.push({
      id: chat.id,
      data: chat.data().data,
      type: chat.data().type,
      sendTime: chat.data().sendTime,
      sender: chat.data().sender,
    });
  });
  message.sort((a, b) => a.sendTime - b.sendTime);
  return message;
}

async function getRelativeMessageTime(chatId) { // 目前沒用到
  const db = getFirestore(app);

  const time = [];
  const querySnapshot = await getDocs(collection(db, `chatroom/${chatId}/messages`));
  querySnapshot.forEach((doc1) => {
    time.push({
      sendTime: doc1.data().sendTime,
    });
  });
  time.sort((a, b) => a.sendTime - b.sendTime);
  const uniquetime = [...new Set(time)];
  return uniquetime;
}

async function getNewestMessage(chatId) {
  const uid = UserController.getUid();
  const db = getFirestore(app);
  const message = [];
  let otherID;
  let last;
  const chatroom = await getDocs(collection(db, `chatroom/${chatId}/members`));

  chatroom.forEach((person) => {
    if (person.id !== uid) {
      otherID = person.id;
    }
  });
  const infoDoc = doc(db, `attendees/${otherID}`);

  const querySnapshot = await getDoc(infoDoc);
  const attendeeInfo = {
    studentUid: querySnapshot.id,
    avatar: querySnapshot.data().avatar,
    email: querySnapshot.data().email,
    grade: querySnapshot.data().grade,
    major: querySnapshot.data().major,
    name: querySnapshot.data().name,
    phone: querySnapshot.data().phone,
    studentID: querySnapshot.data().studentID,
  };
  const chatTextRef = query(collection(db, `chatroom/${chatId}/messages`));
  if (chatTextRef) {
    const chatText = await getDocs(chatTextRef);
    chatText.forEach((chat) => {
      // Push bunch of chat messages into array.
      message.push({
        ...attendeeInfo,
        id: chatId,
        data: chat.data().data,
        type: chat.data().type,
        sendTime: chat.data().sendTime,
        othersUid: otherID,
      });
    });
    // Sort messages from oldest to newest.
    message.sort((a, b) => a.sendTime - b.sendTime);
    // Get the latest message.
    last = message.pop();
    if (last.type === 'image') {
      last.data = '他傳送了一張照片';
    }
  } else {
    last = {
      ...attendeeInfo,
      id: chatId,
      data: '',
      type: 'text',
      sendTime: '',
      othersUid: otherID,
    };
  }

  return last;
}

async function Notification(notifymessage, eventID) {
  const UserStudent = UserController.getUid();
  const db = getFirestore(app);
  const infoRef = query(collection(db, 'attendees'));
  const chatIdList = [];
  const newChat = [];
  // 所有參加者

  const chatroom = await getDocs(collection(db, 'chatroom'));
  chatroom.forEach((chat) => {
    chatIdList.push(chat.id);
  });
  // console.log('idlist', chatIdList);
  for (let i = 0; i < chatIdList.length; i += 1) {
    // console.log(chatIdList[i]);
    const result = await getDocs(collection(db, `chatroom/${chatIdList[i]}/members`));
    result.forEach((r) => {
      if (r.id === UserStudent) {
        newChat.push(chatIdList[i]);
      }
    });
  }

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

// 找跟user有關的chatroom的chatroom id
async function addText(userUid) {
  const chatIdList = [];
  const newChat = [];
  const db = getFirestore(app);
  const chatroom = await getDocs(collection(db, 'chatroom'));
  chatroom.forEach((chat) => {
    chatIdList.push(chat.id);
  });
  for (let i = 0; i < chatIdList.length; i += 1) {
    const result = await getDocs(collection(db, `chatroom/${chatIdList[i]}/members`));
    result.forEach((r) => {
      if (r.id === userUid) {
        newChat.push(chatIdList[i]);
      }
    });
  }
  console.log(newChat);
  return newChat;
}

async function addChatroom(other, user) {
  const db = getFirestore(app);
  const newCityRef = query(collection(db, 'chatroom'));
  let check = '';
  // 檢查現有
  const chatIdList = [];
  const newChat = [];
  const chatroom = await getDocs(collection(db, 'chatroom'));
  chatroom.forEach((doc) => {
    chatIdList.push(doc.id);
  });
  for (let i = 0; i < chatIdList.length; i += 1) {
    const result = await getDocs(collection(db, `chatroom/${chatIdList[i]}/members`));
    result.forEach((r) => {
      if (r.id === user) {
        newChat.push(chatIdList[i]);
      }
    });
  }
  console.log(newChat);
  for (let i = 0; i < newChat.length; i += 1) {
    const result = await getDocs(collection(db, `chatroom/${newChat[i]}/members`));
    result.forEach((r) => {
      if (r.id === other) {
        check = newChat[i];
      }
    });
  }
  // //創新的
  if (check == '') {
    const item = {
      lastRead: new Date(),
      unread: false,
    };
    const newchat = {
      data: '',
      sendTime: new Date(),
      sender: user,
      type: 'new',
    };
    addDoc(newCityRef, {}).then((docRef) => {
      setDoc(doc(db, `chatroom/${docRef.id}/members/${other}`), item);
      setDoc(doc(db, `chatroom/${docRef.id}/members/${user}`), item);
      setDoc(doc(db, `chatroom/${docRef.id}/messages/new`), newchat);
      check = docRef.id;
    });
  }
  // console.log("check",check);
  return check;
}

async function onSnap(chatroomId) {
  const db = getFirestore(app);
  const dbRef = collection(db, `chatroom/${chatroomId}/messages`);
  const message = [];
  onSnapshot(dbRef, (docsSnap) => {
    docsSnap.forEach((doc) => {
      if (doc.id !== 'new') {
        message.push({
          id: doc.id,
          data: doc.data().data,
          type: doc.data().type,
          sendTime: doc.data().sendTime,
          sender: doc.data().sender,
        });
      }
    });
    message.sort((a, b) => a.sendTime - b.sendTime);
  });
  return message;
}

export default {
  firebaseConfig,
  addText,
  getHoursMin,
  newMessageTime,
  toDateString,
  addMessage,
  getNewestMessage,
  getRelativeMessage,
  getRelativeMessageTime,
  Notification,
  deleteMessage,
  countUnreadMessage,
  addChatroom,
  onSnap,
};
