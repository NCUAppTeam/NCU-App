import * as firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';

/**
 * dataObj type definition
 * @typedef {object} dataObj
 * @property {string} name - the name of the activity
 * @property {number} price - the price for attendance of this activity
 * @property {timestamp} time - the time when this activity occur
 * @property {number} numberLimit - Rhe upper bound of the number of people
 * @property {string} qualification - who can attendant this activity
 * @property {string} details - description of this activity
 */
/**
 * Get info of one activity
 *
 * @param {string} activityID - id of the activity
 * @returns {object}
 */
export async function getActivityInfo(activityID) {
  const db = firebase.firestore();
  const doc = await db.collection('Activities').doc(activityID).get();

  if (!doc.exists) {
    // await Alert.alert('No event data found!');
  } else {
    const dataObj = doc.data();
    dataObj.id = doc.id;

    return dataObj;
  }

  return null;
}

export async function createAttendance(activityID) {
  try {
    const db = firebase.firestore();
    const { uid } = firebase.auth().currentUser;
    const { name, attendees, numberLimit } = await getActivityInfo(activityID);
    if (!attendees.includes(uid)) {
      if (numberLimit === attendees.length) {
        Alert.alert(`${name} has no vacancy now!`);
      } else {
        const docRef = await db.collection('Activities').doc(activityID);
        docRef.update({
          attendees: firebase.firestore.FieldValue.arrayUnion(uid),
        });
      }
      Alert.alert(`You successfully joined ${name}!`);
    } else {
      Alert.alert(`You had joined ${name} before!`);
    }
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }
}

export async function deleteAttendance(activityID) {
  try {
    const db = firebase.firestore();
    const { uid } = firebase.auth().currentUser;
    const docRef = await db.collection('Activities').doc(activityID);
    docRef.update({
      attendees: firebase.firestore.FieldValue.arrayRemove(uid),
    });
    Alert.alert('You leaved!');
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }
}

export async function createActivity(data) {
  try {
    const db = firebase.firestore();
    const { uid } = firebase.auth().currentUser;
    const res = await db.collection('Activities')
      .add({
        uid,
        tag: data.tag,
        name: data.name,
        price: data.price,
        time: data.time,
        numberLimit: data.numberLimit,
        qualification: data.qualification,
        details: data.details,
        attendees: [uid],
      });
    return res;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

export async function modifyActivity(data) {
  try {
    const db = firebase.firestore();
    const { uid } = firebase.auth().currentUser;
    const res = await db.collection('Activities')
      .doc(data.id)
      .set({
        uid,
        tag: data.tag,
        name: data.name,
        price: data.price,
        time: data.time,
        numberLimit: data.numberLimit,
        qualification: data.qualification,
        details: data.details,
        attendees: data.attendees,
      });

    return res;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

export async function deleteActivity(activityID) {
  try {
    const db = firebase.firestore();
    const res = await db.collection('Activities').doc(activityID).delete();

    return res;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

export async function getTagActivities(tagId) {
  try {
    const db = firebase.firestore();
    const activityRef = await db.collection('Activities');
    const activitiesQueryRes = await activityRef.where('ActivitiesTags', '==', tagId).get();
    const activitiesRes = [];
    activitiesQueryRes.forEach((doc) => {
      const dataObj = doc.data();
      dataObj.id = doc.id;
      activitiesRes.push(dataObj);
    });
    await Promise.all(activitiesRes);

    return activitiesRes;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

export async function getAllActivities() {
  try {
    const db = firebase.firestore();
    const activityRef = await db.collection('Activities');
    const activityQueryRes = await activityRef.get();
    const activityRes = [];
    activityQueryRes.forEach((doc) => {
      const dataObj = doc.data();
      dataObj.id = doc.id;
      activityRes.push(dataObj);
    });
    await Promise.all(activityRes);

    return activityRes;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

export async function getUserActivities() {
  try {
    const db = firebase.firestore();
    const activityRef = await db.collection('Activities');
    const { uid } = firebase.auth().currentUser;
    const userActivityQueryRes = await activityRef.where('uid', '==', uid).get();
    const userActivityRes = [];
    if (userActivityQueryRes !== null) {
      userActivityQueryRes.forEach((doc) => {
        const dataObj = doc.data();
        dataObj.id = doc.id;
        userActivityRes.push(dataObj);
      });
      await Promise.all(userActivityRes);
    }

    return userActivityRes;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

export async function getTags() {
  try {
    const db = firebase.firestore();
    const activityTagRef = await db.collection('ActivitiesTags');
    const activityTagQueryRes = await activityTagRef.get();
    const activityTagRes = [];
    activityTagQueryRes.forEach((doc) => {
      const dataObj = doc.data();
      dataObj.id = doc.id;
      activityTagRes.push(dataObj);
    });

    return activityTagRes;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

/**
 * Search activtiy
 *
 * @param {string} query - The search to search for.
 * @param {string} tagId - The ID of the tag, can be undefined.
 */
export async function querySearch(query, tagId = undefined) {
  const db = firebase.firestore();
  const itemRef = db.collection('Activities');
  let queryRef = itemRef.where('name', '>=', query);
  if (tagId) {
    queryRef = queryRef.where('ActivitiesTags', '==', tagId);
  }
  const querySnapshot = await queryRef.get();
  const resultArray = [];
  querySnapshot.forEach((item) => {
    resultArray.push({ id: item.id, ...item.data() });
  });
  return resultArray;
}
