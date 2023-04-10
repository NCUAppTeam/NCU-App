/* eslint-disable no-console */
/* eslint-disable no-loop-func */
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, query, getDoc, getDocs,
  addDoc, doc, deleteDoc, setDoc, onSnapshot,
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
  const chatroomId = messageData.id;
  const item = {
    sender: messageData.sender,
    type: messageData.type,
    sendTime: messageData.sendTime,
    read: false,
  };
  if (messageData.type === 'image') {
    const imageAddress = `message/${imagePos(messageData.uri)}`;
    const storageRef = ref(storage, imageAddress);
    const response = await fetch(messageData.uri);
    const blob = await response.blob();
    const uploadTask = await uploadBytes(storageRef, blob);
    const uri = await getDownloadURL(uploadTask.ref);

    if (uri !== undefined) {
      item.data = uri;
    }
  } else {
    item.data = messageData.data.trim();
  }

  const db = getFirestore(app);
  const messageRef = query(collection(db, `chatroom/${chatroomId}/messages`));
  addDoc(messageRef, item).then(() => {
    console.log('message sent successfully!');
  }).catch((error) => {
    console.log(error);
  });
}

// 獲得某聊天室所有訊息
async function getRelativeMessage(chatId) {
  const db = getFirestore(app);
  const uid = UserController.getUid();
  const message = [];

  const chatText = await getDocs(collection(db, `chatroom/${chatId}/messages`));
  chatText.forEach((chat) => {
    console.log(chat.data().sender !== uid);
    if (chat.data().sender !== uid) {
      setDoc(doc(db, `chatroom/${chatId}/messages/${chat.id}`), { read: true }, { merge: true });
    }
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

// 獲得使用者各聊天室最新消息
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

  // 獲取other的資料
  const infoDoc = doc(db, `attendees/${otherID}`);
  const querySnapshot = await getDoc(infoDoc);
  const attendeeInfo = {
    avatar: querySnapshot.data().avatar,
    name: querySnapshot.data().name,
  };

  // 獲取所有消息
  const chatTextRef = query(collection(db, `chatroom/${chatId}/messages`));
  const chatText = await getDocs(chatTextRef);
  chatText.forEach((chat) => {
    // Push bunch of chat messages into array.
    if (chat.data() !== null) {
      if (chat.data().type === 'image') {
        message.push({
          ...attendeeInfo,
          id: chatId,
          data: '他傳送了一張照片',
          type: chat.data().type,
          sendTime: chat.data().sendTime,
          othersUid: otherID,
          sender: chat.data().sender,
          read: chat.data().read,
        });
      } else {
        message.push({
          ...attendeeInfo,
          id: chatId,
          data: chat.data().data,
          type: chat.data().type,
          sendTime: chat.data().sendTime,
          othersUid: otherID,
          sender: chat.data().sender,
          read: chat.data().read,
        });
      }
    }
  });

  // Sort messages from oldest to newest.
  message.sort((a, b) => a.sendTime - b.sendTime);
  // Get the latest message.
  last = message.pop();
  if (last.sender !== otherID) {
    last.read = true;
  }

  // if chatroom exist, but no previous message
  if (last === undefined) {
    last = {
      ...attendeeInfo,
      id: chatId,
      data: '',
      type: '',
      sendTime: '',
      othersUid: otherID,
      read: true,
    };
  }
  return last;
}

async function Notification(notifymessage, eventID) {
  const UserStudent = UserController.getUid();
  const db = getFirestore(app);
  const infoDocs = await getDocs(collection(db, 'attendees'));
  const sendList = [];

  // 訊息內容
  const item = {
    sender: UserStudent,
    sendTime: new Date(),
    data: notifymessage,
    type: 'text',
    read: false,
  };

  // 所有參加者
  infoDocs.forEach(async (attendee) => {
    const resultRef = query(collection(db, `attendees/${attendee.id}/attendedEvent`));
    const result = await getDocs(resultRef);
    result.forEach((event) => {
      if (event.id === eventID) {
        sendList.push(attendee.id);
      }
    });
  });

  // 檢查現有
  const chatIdList = [];
  const chatroom = await getDocs(collection(db, 'chatroom'));
  let count;
  let existedChat;
  const addNew = [];
  let exist = false;
  chatroom.forEach((c) => {
    chatIdList.push(c.id);
  });

  // 傳送消息
  for (let i = 0; i < sendList.length; i += 1) {
    for (let j = 0; j < chatIdList.length; j += 1) {
      count = 0;
      existedChat = chatIdList[j];
      const result = await getDocs(collection(db, `chatroom/${existedChat}/members`));
      result.forEach((r) => {
        if (r.id === UserStudent || r.id === sendList[i]) {
          count += 1;
        }
      });
      if (count === 2) {
        console.log(existedChat);
        addDoc(collection(db, `chatroom/${existedChat}/messages`), item, { merge: true });
        exist = true;
        break;
      }
    }
    if (exist === false) {
      addNew.push(sendList[i]);
    }
  }
  const add = [...new Set(addNew)];

  // 全部檢查完沒有的話
  for (let k = 0; k < add.length; k += 1) {
    const newRef = doc(collection(db, 'chatroom'));
    const snapshot = await getDoc(newRef);
    setDoc(doc(db, `chatroom/${snapshot.id}/members/${UserStudent}`), {}, { merge: true });
    setDoc(doc(db, `chatroom/${snapshot.id}/members/${add[k]}`), {}, { merge: true });
    setDoc(doc(db, `chatroom/${snapshot.id}`), {}, { merge: true });
    addDoc(collection(db, `chatroom/${snapshot.id}/messages`), item, { merge: true }).catch((error) => {
      console.log(error);
    });
  }
}

async function deleteMessage(chatroomId, messageID) {
  const db = getFirestore(app);
  const deleteRef = doc(db, `chatroom/${chatroomId}/messages/${messageID}`);
  const deletedDoc = await getDoc(deleteRef);

  if (deletedDoc.data().type === 'image') {
    const imageRef = ref(storage, `message/${deletedDoc.data().data.substr(-94, 41)}`);
    deleteObject(imageRef).then(() => {
      console.log('origin image1 has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
    deleteDoc(deleteRef);
  } else {
    deleteDoc(deleteRef);
  }
}

// 找跟user有關的chatroom的chatroom id
async function findRelateChatroom(userUid) {
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
  return newChat;
}

// 新增聊天室
async function addChatroom(other, user) {
  const db = getFirestore(app);
  let returnID;
  let count;

  // 檢查現有
  const relate = await findRelateChatroom(user);
  let exist = false;
  for (let i = 0; i < relate.length; i += 1) {
    count = 0;
    const result = await getDocs(collection(db, `chatroom/${relate[i]}/members`));
    result.forEach((r) => {
      if (r.id === user || r.id === other) {
        count += 1;
      }
    });
    if (count === 2) {
      returnID = relate[i];
      exist = true;
      break;
    }
  }

  // 如果沒有, 就新增一個聊天室
  if (exist === false) {
    const newRef = doc(collection(db, 'chatroom'));
    const snapshot = await getDoc(newRef);
    setDoc(doc(db, `chatroom/${snapshot.id}/members/${user}`), {}, { merge: true });
    setDoc(doc(db, `chatroom/${snapshot.id}/members/${other}`), {}, { merge: true });
    setDoc(doc(db, `chatroom/${snapshot.id}`), {}, { merge: true });
    returnID = snapshot.id;
  }
  return returnID;
}

// 監聽即時訊息
async function onSnap(chatroomId) {
  const db = getFirestore(app);
  const dbRef = collection(db, `chatroom/${chatroomId}/messages`);
  const message = [];
  onSnapshot(dbRef, (docsSnap) => {
    docsSnap.forEach((snap) => {
      if (snap.id !== 'new') {
        message.push({
          id: snap.id,
          data: snap.data().data,
          type: snap.data().type,
          sendTime: snap.data().sendTime,
          sender: snap.data().sender,
        });
      }
    });
    message.sort((a, b) => a.sendTime - b.sendTime);
  });
  return message;
}

// 計算未讀訊息
async function countUnreadMessage(uid) {
  const db = getFirestore(app);
  const relate = await findRelateChatroom(uid);
  const messagecount = [];
  for (let i = 0; i < relate.length; i += 1) {
    const messageRef = await getDocs(query(collection(db, `chatroom/${relate[i]}/messages`)));
    messageRef.forEach((result) => {
      if (result.data().read === false && result.data().sender !== uid.trim()) {
        messagecount.push(result.id);
      }
    });
  }
  return messagecount.length;
}

export default {
  firebaseConfig,
  findRelateChatroom,
  getHoursMin,
  newMessageTime,
  toDateString,
  addMessage,
  getNewestMessage,
  getRelativeMessage,
  Notification,
  deleteMessage,
  countUnreadMessage,
  addChatroom,
  onSnap,
};
