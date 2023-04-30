/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-loop-func */
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
import {
  getFirestore, collection, query, getDoc, getDocs,
  addDoc, doc, deleteDoc, setDoc, onSnapshot, where, orderBy, limit,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { getApp } from 'firebase/app';
import UserController from './getStudentId';

const app = getApp();
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
  const db = getFirestore(app);
  const messageRef = query(collection(db, `chatrooms/${chatroomId}/messages`));
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

  addDoc(messageRef, item).then(() => {
    console.log('message sent successfully!');
  }).catch((error) => {
    console.log(error);
  });
}

// 獲得使用者各聊天室最新消息
async function getNewestMessage(chatroom) {
  const uid = UserController.getUid();
  const db = getFirestore(app);
  let otherID = null;
  const members = await chatroom.members;
  members.forEach((id) => {
    if (uid !== id) otherID = id;
  });
  let last;

  // 獲取other的資料
  const infoDoc = doc(db, `attendees/${otherID}`);
  const querySnapshot = await getDoc(infoDoc);
  const attendeeInfo = {
    avatar: querySnapshot.data().avatar,
    name: querySnapshot.data().name,
  };

  // 獲取最後一則消息 limit(1)
  const q = query(collection(db, `chatrooms/${chatroom.id}/messages`), orderBy('sendTime', 'desc'), limit(1));
  (await getDocs(q)).forEach((chat) => {
    if (chat.data() !== null) {
      if (chat.data().type === 'image') {
        last = {
          ...attendeeInfo,
          id: chatroom.id,
          sendTime: chat.data().sendTime,
          othersUid: otherID,
          sender: chat.data().sender,
          read: chat.data().read,
        };
        if (last.sender === uid) {
          last.data = '我傳送了一張照片';
        } else {
          last.data = '對方傳送了一張照片';
        }
      } else if (chat.data().type === 'text') {
        last = {
          ...attendeeInfo,
          id: chatroom.id,
          data: chat.data().data,
          sendTime: chat.data().sendTime,
          othersUid: otherID,
          sender: chat.data().sender,
          read: chat.data().read,
        };
      }
    }
    // sender 是自己 && 對方未已讀 => 需要將read手動設成true(因為read紀錄的是對方是否已讀)
    if (last.sender === uid && last.read === false) {
      last.read = true;
    }
  });

  // if chatroom exist, but no previous message, set value of read true
  if (last === undefined) {
    last = {
      ...attendeeInfo,
      id: chatroom.id,
      data: '',
      sendTime: '',
      othersUid: otherID,
      read: true,
    };
  }
  return last;
}

async function deleteMessage(chatroomId, messageID) {
  const db = getFirestore(app);
  const deleteRef = doc(db, `chatrooms/${chatroomId}/messages/${messageID}`);
  const deletedDoc = await getDoc(deleteRef);

  if (deletedDoc.data().type === 'image') {
    const imageRef = ref(storage, `message/${deletedDoc.data().data.substr(-94, 41)}`);
    deleteObject(imageRef).then(() => {
      console.log('the image you sent has been deleted!');
    }).catch((err) => {
      console.log(err);
    });
    deleteDoc(deleteRef);
  } else {
    deleteDoc(deleteRef);
  }
}

// 找跟user有關的chatroom的最後一條訊息
async function findRelateChatroom(userUid) {
  const rooms = [];
  const db = getFirestore(app);
  const q = query(collection(db, 'chatrooms'), where('members', 'array-contains', userUid));
  (await getDocs(q)).forEach((chatroom) => {
    rooms.push({
      id: chatroom.id,
      members: chatroom.data().members,
    });
  });
  rooms.sort((a, b) => ((a.id - b.id)));
  const lastMsgs = await Promise.all(rooms.map((chatroom) => getNewestMessage(chatroom)));

  return lastMsgs;
}

// 新增聊天室
async function addChatroom(other, user) {
  const db = getFirestore(app);
  let returnID;
  const relate = [];

  // 檢查現有
  const q = query(collection(db, 'chatrooms'), where('members', 'array-contains', user));
  (await getDocs(q)).forEach((chatroom) => {
    relate.push({
      id: chatroom.id,
      members: chatroom.data().members,
    });
  });

  let exist = false;
  relate.map((chatroom) => chatroom.members.forEach((memberID) => {
    if (other === memberID) {
      returnID = chatroom.id;
      exist = true;
    }
  }));

  // 如果沒有, 就新增一個聊天室
  if (exist === false) {
    const newRef = doc(collection(db, 'chatrooms'));
    const snapshot = await getDoc(newRef);
    setDoc(doc(db, `chatrooms/${snapshot.id}`), { members: [user, other] }, { merge: true });
    returnID = snapshot.id;
  }
  return returnID;
}

// 監聽即時訊息
async function onSnap(chatroomId) {
  const db = getFirestore(app);
  const dbRef = collection(db, `chatrooms/${chatroomId}/messages`);
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

// 獲取未讀訊息id
async function countUnreadMessage(uid) {
  const db = getFirestore(app);
  const relate = [];

  const q = query(collection(db, 'chatrooms'), where('members', 'array-contains', uid));
  (await getDocs(q)).forEach((chatroom) => {
    relate.push(chatroom.id);
  });
  const count = [];
  for (let i = 0; i < relate.length; i += 1) {
    const messageRef = query(collection(db, `chatrooms/${relate[i]}/messages`));
    (await getDocs(messageRef)).forEach((result) => {
      if (result.data().read === false && result.data().sender !== uid.trim()) {
        count.push(result.id);
      }
    });
  }
  return count.length;
}

async function readMessage(uid, chatroomID) {
  const db = getFirestore(app);
  const messageRef = query(collection(db, `chatrooms/${chatroomID}/messages`));

  (await getDocs(messageRef)).forEach((result) => {
    if (result.data().read === false && result.data().sender !== uid) {
      setDoc(doc(db, `chatrooms/${chatroomID}/messages/${result.id}`), { read: true }, { merge: true });
    }
  });
}

async function Notification(notifymessage, eventID) {
  const UserStudent = UserController.getUid();
  const db = getFirestore(app);
  const infoDocs = await getDocs(collection(db, 'attendees'));
  const IDlist = [];
  const sendList = [];
  const attend = false;

  // 訊息內容
  const item = {
    sender: UserStudent,
    sendTime: new Date(),
    data: notifymessage,
    type: 'text',
    read: false,
  };

  // 所有參加者
  infoDocs.forEach((attendee) => {
    IDlist.push(attendee.id);
  });

  for (let i = 0; i < IDlist.length; i += 1) {
    const resultRef = query(collection(db, `attendees/${IDlist[i]}/attendedEvent`));
    const result = await getDocs(resultRef);
    result.forEach((event) => {
      if (event.id === eventID) {
        sendList.push(IDlist[i]);
      }
    });
  }

  // 傳送消息
  for (let i = 0; i < sendList.length; i += 1) {
    addChatroom(sendList[i], UserStudent).then((returnID) => {
      addDoc(collection(db, `chatrooms/${returnID}/messages`), item, { merge: true }).then(console.log('notify eveyone succeed'));
    });
  }
}

export default {
  findRelateChatroom,
  getHoursMin,
  newMessageTime,
  toDateString,
  addMessage,
  getNewestMessage,
  Notification,
  deleteMessage,
  countUnreadMessage,
  readMessage,
  addChatroom,
  onSnap,
};
