import * as firebase from 'firebase';
import { Alert } from 'react-native';

/**
 * Get the formatted date string
 *
 * @param {Date} date - the date object
 *
 * @returns {Date} the formatted date string
 */
function toDateString(date) {
  const dateString = `${date.getFullYear().toString()}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getDate().toString().padStart(2, '0')}  ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}:${
    date.getSeconds().toString().padStart(2, '0')}`;

  return dateString;
}

/**
 * Get the formatted name of the image
 *
 * @param {String} uid - the ID of the user
 * @param {Date} date - the date object
 *
 * @returns {String} the formatted name of the image
 */
function getImageName(uid, date) {
  const imageName = `${uid}_${
    date.getFullYear().toString()}${
    (date.getMonth() + 1).toString().padStart(2, '0')}${
    date.getDate().toString().padStart(2, '0')}${
    date.getHours().toString().padStart(2, '0')}${
    date.getMinutes().toString().padStart(2, '0')}${
    date.getSeconds().toString().padStart(2, '0')}${
    date.getMilliseconds().toString().padStart(3, '0')}`;

  return imageName;
}

/**
 * Get all tags as an array
 *
 * @returns {Array} all tags
 */
async function getAllTag() {
  const db = firebase.firestore();
  const tagRef = db.collection('SalesTags');

  const tagArray = [];
  const querySnapshot = await tagRef.orderBy('order').get();
  querySnapshot.forEach((doc) => {
    const tag = doc.data();
    tag.id = doc.id;
    tagArray.push(tag);
  });

  return (tagArray);
}

/**
 * Add an item
 *
 * @param {String} name - the name of the item
 * @param {String} price - the price of the item
 * @param {String} place - where the seller expected to deal
 * @param {String} introduction - detail or note of the item
 * @param {String} tagId - the ID of the chosen tag
 * @param {String} imageUri - the uri of the image
 */
async function addItem(name, price, place, introduction, tagId, imageUri) {
  const { uid } = firebase.auth().currentUser;
  const date = new Date();

  const db = firebase.firestore();
  const itemRef = db.collection('Sales');

  const imageAddress = `sales/${getImageName(uid, date)}`;
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(imageAddress);

  const item = {
    uid,
    name: name.trim(),
    price: price.trim(),
    place: place.trim(),
    introduction: introduction.trim(),
    date,
    dateString: toDateString(date),
    show: true,
    tagId: tagId.trim(),
    imageAddress,
  };

  if (!item.name) throw new Error('名稱不得為空！');
  if (!item.price) throw new Error('價錢不得為空！');
  if (!item.place) throw new Error('地點不得為空！');
  if (!item.tagId) throw new Error('你必須選擇一個標籤！');
  if (!imageUri) throw new Error('你必須上傳一張圖片！');

  item.price = Number(item.price);
  if (Number.isNaN(item.price)) throw new Error('價格必須為數字！');

  const response = await fetch(imageUri);
  const blob = await response.blob();
  imageRef.put(blob);
  itemRef.add(item);
  Alert.alert('新增成功!');
}

/**
 * Update an item including the showing state
 *
 * @param {String} itemId - the ID of the item
 * @param {String} name - the name of the item
 * @param {String} price - the price of the item
 * @param {String} place - where the seller expected to deal
 * @param {String} introduction - detail or note of the item
 * @param {String} tagId - the ID of the chosen tag
 * @param {Boolean} imageEditted - if the image was editted
 * @param {String} imageUri - the uri of the image, undefined means the image had not been editted
 */
async function updateItem(
  itemId, name, price, place, introduction, tagId, imageEditted, imageUri = undefined,
) {
  const { uid } = firebase.auth().currentUser;
  const date = new Date();

  const db = firebase.firestore();
  const itemRef = db.collection('Sales');
  const itemDocRef = await itemRef.doc(itemId).get();

  const imageAddress = imageEditted ? `sales/${getImageName(uid, date)}` : itemDocRef.data().imageAddress;
  const storageRef = firebase.storage().ref();
  const oldImageRef = storageRef.child(itemDocRef.data().imageAddress);
  const newImageRef = storageRef.child(imageAddress);

  const newItem = {
    uid,
    name: name.trim(),
    price: price.trim(),
    place: place.trim(),
    introduction: introduction.trim(),
    date,
    dateString: toDateString(date),
    tagId: tagId.trim(),
    imageAddress,
  };

  if (!newItem.name) throw new Error('名稱不得為空！');
  if (!newItem.price) throw new Error('價錢不得為空！');
  if (!newItem.place) throw new Error('地點不得為空！');
  if (!newItem.tagId) throw new Error('你必須選擇一個標籤！');
  if (imageEditted && !imageUri) throw new Error('你必須上傳一張圖片！');

  newItem.price = Number(newItem.price);
  if (Number.isNaN(newItem.price)) throw new Error('價格必須為數字！');

  if (imageEditted) {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    oldImageRef.delete();
    newImageRef.put(blob);
  }
  itemRef.doc(itemId).set(newItem, { merge: true });
  Alert.alert('更新成功!');
}

/**
 * Delete the item
 *
 * @param {String} itemId - the ID of the item
 */
async function deleteItem(itemId) {
  const db = firebase.firestore();
  const itemDocRef = db.collection('Sales').doc(itemId);
  const itemDocData = await itemDocRef.get();

  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(itemDocData.data().imageAddress);

  imageRef.delete();
  itemDocRef.delete();
  Alert.alert('刪除成功');
}

/**
 * Change the visibility of the item
 *
 * @param {String} itemId - the ID of the item
 * @param {Boolean} show - true: visible, false: invisible
 */
function changeShow(itemId, show) {
  const db = firebase.firestore();
  const itemDocRef = db.collection('Sales').doc(itemId);
  itemDocRef.set({
    show,
  }, { merge: true });
  Alert.alert('狀態更新成功');
}

/**
 * Get all personal items as an array
 *
 * item type definition
 * @typedef {Object} item
 * @property {String} id - the ID of the item
 * @property {String} name - the name of the item
 * @property {String} price - the price of the item
 * @property {String} place - where the seller expected to deal
 * @property {String} introduction - detail or note of the item
 * @property {String} dateString - the formatted date string
 * @property {Boolean} show - true: visible, false: invisible
 * @property {String} tagId - the ID of the chosen tag
 * @property {String} tagName - the name of the tag
 * @property {String} imageUrl - the url of the image
 *
 * @returns {Array} all personal items (visible and invisible items)
 */
async function getPersonalItem() {
  const { uid } = firebase.auth().currentUser;

  const db = firebase.firestore();
  const tagRef = db.collection('SalesTags');
  const itemRef = db.collection('Sales');

  const storageRef = firebase.storage().ref();

  const itemArray = [];
  const querySnapshot = await itemRef.where('uid', '==', uid).orderBy('date').get();
  querySnapshot.forEach((doc) => {
    itemArray.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  const result = await Promise.all(itemArray.map(async (item) => {
    const tagDocRef = await tagRef.doc(item.tagId).get();
    const tagName = tagDocRef.data().name;
    const imageUrl = await storageRef.child(item.imageAddress).getDownloadURL();
    return {
      ...item,
      tagName,
      imageUrl,
    };
  }));

  return (result);
}

/**
 * Get all the home page items as an array
 *
 * item type definition
 * @typedef {Object} item
 * @property {String} id - the ID of the item
 * @property {String} name - the name of the item
 * @property {String} price - the price of the item
 * @property {String} place - where the seller expected to deal
 * @property {String} introduction - detail or note of the item
 * @property {String} dateString - the formatted date string
 * @property {Boolean} show - true: visible, false: invisible
 * @property {String} tagId - the ID of the chosen tag
 * @property {String} tagName - the name of the tag
 * @property {String} sellerName - the seller's name
 * @property {String} imageUrl - the url of the image
 *
 * @param {String} chosenTagId - the ID of the chosen tag, undefined means list all
 * @param {Integer} chosenSort - 0: date, 1: name, 2: price, undefined means date
 * @param {Boolean} orderAscend - true: ascending sort, false: descending sort, undefined means desc
 *
 * @returns {Array} all home page items (only visible items)
 */
async function getHomePageItem(chosenTagId = undefined, chosenSort = 0, orderAscend = false) {
  const db = firebase.firestore();
  const tagRef = db.collection('SalesTags');
  const itemRef = db.collection('Sales');
  const profileRef = db.collection('Profiles');

  const storageRef = firebase.storage().ref();

  const itemArray = [];
  let querySnapshot = itemRef.where('show', '==', true);

  if (chosenTagId) querySnapshot = querySnapshot.where('tagId', '==', chosenTagId);

  if (chosenSort === 0) {
    if (orderAscend) querySnapshot = querySnapshot.orderBy('date', 'asc');
    else querySnapshot = querySnapshot.orderBy('date', 'desc');
  } else if (chosenSort === 1) {
    if (orderAscend) querySnapshot = querySnapshot.orderBy('name', 'asc');
    else querySnapshot = querySnapshot.orderBy('name', 'desc');
  } else if (chosenSort === 2) {
    if (orderAscend) querySnapshot = querySnapshot.orderBy('price', 'asc');
    else querySnapshot = querySnapshot.orderBy('price', 'desc');
  }

  querySnapshot = await querySnapshot.get();
  querySnapshot.forEach((doc) => {
    itemArray.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  const result = await Promise.all(itemArray.map(async (item) => {
    const tagDocRef = await tagRef.doc(item.tagId).get();
    const sellerDocRef = await profileRef.doc(item.uid).get();
    const tagName = tagDocRef.data().name;
    const sellerName = sellerDocRef.data().name;
    const imageUrl = await storageRef.child(item.imageAddress).getDownloadURL();
    return {
      ...item,
      tagName,
      sellerName,
      imageUrl,
    };
  }));

  return (result);
}

/**
 * Search Items
 *
 * @param {String} query - The search to search for.
 * @param {String} tagId - The ID of the tag, can be undefined.
 */
async function querySearch(query, tagId = undefined) {
  const db = firebase.firestore();
  const itemRef = db.collection('Sales');
  let queryRef = itemRef.where('name', '>=', query);
  if (tagId) {
    queryRef = queryRef.where('tagId', '==', tagId);
  }
  const querySnapshot = await queryRef.get();
  const itemsArray = [];
  querySnapshot.forEach((item) => {
    itemsArray.push({ id: item.id, ...item.data() });
  });
  return itemsArray;
}

/**
 * Add a comment
 *
 * @param {String} itemId - ID of target item to comment
 * @param {String} content - The content of comment message
 */
async function addComment(itemId, content) {
  const date = new Date();

  const db = firebase.firestore();
  const commentRef = db.collection('Sales').doc(itemId).collection('comments');

  const comment = {
    uid: firebase.auth().currentUser.uid,
    content: content.trim(),
    date,
    dateString: toDateString(date),
  };

  if (!comment.content) throw new Error('內容不得為空!');

  commentRef.add(comment);
  Alert.alert('留言成功');
}

/**
 * Update a comment
 *
 * @param {String} itemId - the ID of the item that contains the comment
 * @param {String} commentId - the ID of the comment
 * @param {String} content - the content of the comment
 */
function updateComment(itemId, commentId, content) {
  const date = new Date();

  const db = firebase.firestore();
  const commentRef = db.collection('Sales').doc(itemId).collection('comments');

  const comment = {
    uid: firebase.auth().currentUser.uid,
    content: content.trim(),
    date,
    dateString: toDateString(date),
  };

  if (!comment.content) throw new Error('內容不得為空!');

  commentRef.doc(commentId).set(comment);
  Alert.alert('更新成功');
}

/**
 * Delete a comment
 *
 * @param {String} itemId - the ID of the item
 * @param {String} commentId - the ID of the comment
 */
function deleteComment(itemId, commentId) {
  const db = firebase.firestore();
  const commentDocRef = db.collection('Sales').doc(itemId).collection('comments').doc(commentId);
  commentDocRef.delete();
  Alert.alert('刪除成功');
}

/**
 * Get all comments of the item as an array
 *
 * comment type definition
 * @typedef {Object} comment
 * @property {String} id - the ID of the comment
 * @property {String} content - the content of the comment
 * @property {String} commenterName - the user's name
 * @property {String} dateString - the formatted date string
 *
 * @param {String} itemId - the ID of the item
 *
 * @returns {Array} all comments of the item
 */
async function getItemComment(itemId) {
  const db = firebase.firestore();
  const profileRef = db.collection('Profiles');
  const commentRef = db.collection('Sales').doc(itemId).collection('comments');

  const commentArray = [];
  const querySnapshot = await commentRef.get();
  querySnapshot.forEach((doc) => {
    commentArray.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  const result = await Promise.all(commentArray.map(async (comment) => {
    const commenterDocRef = await profileRef.doc(comment.uid).get();
    const commenterName = commenterDocRef.data().name;
    return {
      ...comment,
      commenterName,
    };
  }));

  result.sort((a, b) => a.date.seconds - b.date.seconds);
  return (result);
}

// 新的 addItem
async function newAddItem(
  productName, price, tradeLocation, description, tag, imageUri, negotiable, type,
) {
  const { uid } = firebase.auth().currentUser;
  const date = new Date();

  const db = firebase.firestore();
  const itemRef = db.collection('Sales');

  const imageAddress = `sales/${getImageName(uid, date)}`;
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(imageAddress);

  const item = {
    uid,
    description: description.trim(),
    imageAddress,
    launchTime: date,
    negotiable,
    price: price.trim(),
    productName: productName.trim(),
    tag: tag.trim(),
    tradeLocation,
    type: type.trim(),

    // uid,
    // name: name.trim(),
    // price: price.trim(),
    // place: place.trim(),
    // introduction: introduction.trim(),
    // date,
    // dateString: toDateString(date),
    // show: true,
    // tagId: tagId.trim(),
    // imageAddress,
  };

  if (!item.productName) throw new Error('名稱不得為空！');
  if (!item.price) throw new Error('價錢不得為空！');
  if (!item.tradeLocation) throw new Error('地點不得為空！');
  if (!item.tag) throw new Error('你必須選擇一個標籤！');
  if (!imageUri) throw new Error('你必須上傳一張圖片！');

  item.price = Number(item.price);
  if (Number.isNaN(item.price)) throw new Error('價格必須為數字！');

  const response = await fetch(imageUri);
  const blob = await response.blob();
  imageRef.put(blob);
  itemRef.add(item);
  Alert.alert('新增成功!');
}

// 新的 updateItem
async function newUpdateItem(
  itemId, productName, price, tradeLocation, description, tag, imageEditted, imageUri = undefined,
) {
  const { uid } = firebase.auth().currentUser;
  const date = new Date();

  const db = firebase.firestore();
  const itemRef = db.collection('Sales');
  const itemDocRef = await itemRef.doc(itemId).get();

  const imageAddress = imageEditted ? `sales/${getImageName(uid, date)}` : itemDocRef.data().imageAddress;
  const storageRef = firebase.storage().ref();
  const oldImageRef = storageRef.child(itemDocRef.data().imageAddress);
  const newImageRef = storageRef.child(imageAddress);

  const newItem = {
    uid,
    productName: productName.trim(),
    price: price.trim(),
    tradeLocation: tradeLocation.trim(),
    description: description.trim(),
    launchTime: date,
    dateString: toDateString(date),
    tag: tag.trim(),
    imageAddress,
  };

  if (!newItem.productName) throw new Error('名稱不得為空！');
  if (!newItem.price) throw new Error('價錢不得為空！');
  if (!newItem.tradeLocation) throw new Error('地點不得為空！');
  if (!newItem.tagId) throw new Error('你必須選擇一個標籤！');
  if (imageEditted && !imageUri) throw new Error('你必須上傳一張圖片！');

  newItem.price = Number(newItem.price);
  if (Number.isNaN(newItem.price)) throw new Error('價格必須為數字！');

  if (imageEditted) {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    oldImageRef.delete();
    newImageRef.put(blob);
  }
  itemRef.doc(itemId).set(newItem, { merge: true });
  Alert.alert('更新成功!');
}

// 新的 deleteItem
async function newDeleteItem(itemId) {
  const db = firebase.firestore();
  const itemDocRef = db.collection('Sales').doc(itemId);
  const itemDocData = await itemDocRef.get();

  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(itemDocData.data().imageAddress);

  imageRef.delete();
  itemDocRef.delete();
  Alert.alert('刪除成功');
}

// type = 收購的商品
async function getPurchaseItem() {
  const itemsArray = [];
  const db = firebase.firestore();
  const itemRef = db.collection('Sales');
  const querySnapshot = await itemRef.where('type', '==', '收購').get();
  querySnapshot.forEach((doc) => {
    itemsArray.push({ launchTime: toDateString(doc.data().launchTime), ...doc.data(), id: doc.id });
  });
  // console.log(itemsArray);
  console.log(itemsArray);
  return itemsArray;
}

// type = 出售的商品
async function getSaleItem() {
  const itemsArray = [];
  const db = firebase.firestore();
  const itemRef = db.collection('Sales');
  const querySnapshot = await itemRef.where('type', '==', '出售').get();
  querySnapshot.forEach((doc) => {
    itemsArray.push({ launchTime: toDateString(doc.data().launchTime), ...doc.data(), id: doc.id });
  });
  // console.log(itemsArray);
  return itemsArray;
}

// type = 租借的商品
async function getRentItem() {
  const itemsArray = [];
  const db = firebase.firestore();
  const itemRef = db.collection('Sales');
  const querySnapshot = await itemRef.where('type', '==', '租借').get();
  querySnapshot.forEach((doc) => {
    itemsArray.push({ launchTime: toDateString(doc.data().launchTime), ...doc.data(), id: doc.id });
  });
  // console.log(itemsArray);
  return itemsArray;
}

// 根據 type 得到商品 option 0: 出售、1:收購、2:租借
async function getItembyType(option) {
  const itemsArray = [];
  const type = ['出售', '收購', '租借'];
  const db = firebase.firestore();
  const itemRef = db.collection('Sales');
  const querySnapshot = await itemRef.where('type', '==', type[option]).get();
  querySnapshot.forEach((doc) => {
    itemsArray.push({ launchTime: toDateString(doc.data().launchTime), ...doc.data(), id: doc.id });
  });
  // console.log(itemsArray);
  return itemsArray;
}

export default {
  getAllTag,
  addItem,
  updateItem,
  deleteItem,
  changeShow,
  getPersonalItem,
  getHomePageItem,
  querySearch,
  addComment,
  updateComment,
  deleteComment,
  getItemComment,
  newAddItem,
  newUpdateItem,
  newDeleteItem,
  getPurchaseItem,
  getSaleItem,
  getRentItem,
  getItembyType,
};
