import * as firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';
import CalendarController from './Calendar';

/**
 * Get information of a published event.
 *
 * @typedef {object} eventObj
 * @property {string} name - event name
 * @property {string} location - event location
 * @property {boolean} public - if this event is public
 * @property {timestamp} startTime - the time when the event start
 * @property {timestamp} endTime - the time when the event
 * @property {string} link - The link for the event.
 * @property {string} content - details about this event
 * @property {string} qualification - who can attend this event
 *
 * @param {string} eventID - id in 'Events' collection
 * @returns {eventObj} - The information of the event.
 */
async function getEventInfo(eventID) {
  const db = firebase.firestore();
  const doc = await db.collection('Events').doc(eventID).get();

  if (!doc.exists) {
    // await Alert.alert('No event data found!');
  } else {
    const dataObj = doc.data();
    dataObj.id = doc.id;
    return dataObj;
  }

  return null;
}

/**
 * Get a list of events created by user.
 *
 * @returns {array} - The events that the user created.
 */
async function getUserEvents() {
  const db = firebase.firestore();

  const { uid } = firebase.auth().currentUser;
  const eventsRef = await db.collection('Events');
  const eventQueryRes = await eventsRef.where('uid', '==', uid).get();

  const events = [];
  eventQueryRes.forEach((doc) => {
    events.push({ id: doc.id, data: doc.data() });
  });

  return events;
}

/**
 * Check if user has subscribe to the event.
 *
 * @param {string} eventId- The id of the event.
 */
async function checkSubscribe(eventId) {
  try {
    const db = firebase.firestore();
    const { uid } = firebase.auth().currentUser;

    const calendarRef = await db.collection('CalendarEvents');
    const calendarQueryRes = await calendarRef
      .where('uid', '==', uid)
      .where('eventId', '==', eventId)
      .get();
    return !calendarQueryRes.empty;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

/**
 * Add a calendar schedule for this event.
 *
 * @param {string} eventId - The id of the event.
 */
async function subscribe(eventId) {
  try {
    const eventObj = await getEventInfo(eventId);
    await CalendarController.createSchedule({
      ...eventObj,
      eventId,
    });
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

/**
 * Remove a calendar schedule for this event.
 *
 * @param {string} eventId - The id of the event.
 */
async function unsubscribe(eventId) {
  try {
    const db = firebase.firestore();
    const { uid } = firebase.auth().currentUser;

    const calendarRef = await db.collection('CalendarEvents');
    const calendarQueryRes = await calendarRef
      .where('uid', '==', uid)
      .where('eventId', '==', eventId)
      .get();
    calendarQueryRes.forEach((doc) => {
      calendarRef.doc(doc.id).delete();
    });
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

/**
 * Publish a new event
 *
 * @param {object} eventInfo - Information of the new event.
 * @param {string} eventInfo.type - event or reminder
 * @param {string} eventInfo.name - event name
 * @param {string} eventInfo.location - event location
 * @param {boolean} eventInfo.public - if this event is public
 * @param {timestamp} eventInfo.startTime - the time when the event start
 * @param {timestamp} eventInfo.endTime - the time when the event end
 * @param {string} eventInfo.link - The link for the event.
 * @param {string} eventInfo.content - details about this event
 * @param {string} eventInfo.qualification - who can attend this event
 *
 * @returns {string} id of the new event
 */
async function createEvent(eventInfo) {
  try {
    const db = firebase.firestore();
    const ref = await db.collection('Events')
      .add({
        uid: firebase.auth().currentUser.uid,
        name: eventInfo.name,
        location: eventInfo.location,
        startTime: eventInfo.startTime,
        endTime: eventInfo.endTime,
        link: eventInfo.link,
        content: eventInfo.content,
        qualification: eventInfo.qualification,
      });
    await subscribe(ref.id);
    return ref.id;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

/**
 * Update an published event
 *
 * @param {string} id - ID of the event in 'Events' collection.
 * @param {object} eventInfo - Information of the new event.
 * @param {string} eventInfo.type - event or reminder
 * @param {string} eventInfo.name - event name
 * @param {string} eventInfo.location - event location
 * @param {timestamp} eventInfo.startTime - the time when the event start
 * @param {timestamp} eventInfo.endTime - the time when the event end
 * @param {string} eventInfo.link - The link for the event.
 * @param {string} eventInfo.content - details about this event
 * @param {string} eventInfo.qualification - who can attend this event
 */
async function updateEvent(id, eventInfo) {
  try {
    const db = firebase.firestore();
    db.collection('Events')
      .doc(id)
      .set({
        uid: firebase.auth().currentUser.uid,
        name: eventInfo.name,
        location: eventInfo.location,
        startTime: eventInfo.startTime,
        endTime: eventInfo.endTime,
        link: eventInfo.link,
        content: eventInfo.content,
        qualification: eventInfo.qualification,
      });
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }
}

/**
 * Unpublish an published event
 *
 * @param {string} eventID - id in 'Events' collection
 * @returns {Object} res
 */
async function deleteEvent(eventID) {
  try {
    const db = firebase.firestore();
    const res = await db.collection('Events').doc(eventID).delete();
    return res;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

/**
 * Get eventIDs that are subscribed by the user
 *
 * @returns {Array} - Events that subscribed by user.
 */
async function getSubscribedEvents() {
  const db = firebase.firestore();
  const subscriptionRef = await db.collection('CalendarEvents');
  const { uid } = firebase.auth().currentUser;
  const subscriptionQueryRes = await subscriptionRef
    .where('uid', '==', uid)
    .where('eventID', '!=', null)
    .get();

  const eventIds = [];
  subscriptionQueryRes.forEach((doc) => {
    eventIds.push(doc.data().eventID);
  });
  const eventData = await Promise.all(
    eventIds.docs.map(
      (eventId) => getEventInfo(eventId),
    ),
  );
  return eventData;
}

/**
 * Get all events
 *
 * @returns {Array} subscribedUsers
 */
async function getAllEvents() {
  const db = firebase.firestore();
  const eventsRef = await db.collection('Events');
  const eventQueryRef = await eventsRef.get();

  const events = [];
  eventQueryRef.forEach((doc) => {
    events.push({ id: doc.id, data: doc.data() });
  });
  return events;
}

async function isUserPrvilleged() {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  if (user) {
    const docRef = db.collection('Profiles').doc(user.uid);
    const doc = await docRef.get();
    return doc.data().eventPrivilege === true;
  }
  return false;
}

async function searchEvents(searchKey) {
  const db = firebase.firestore();
  const eventsRef = await db.collection('Events');
  const eventQueryRes = await eventsRef.where('name', '>=', searchKey).get();

  const searchRes = [];
  eventQueryRes.forEach((doc) => {
    searchRes.push({ id: doc.id, data: doc.data() });
  });

  return searchRes;
}

export default {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventInfo,
  checkSubscribe,
  subscribe,
  unsubscribe,
  getSubscribedEvents,
  getAllEvents,
  searchEvents,
  getUserEvents,
  isUserPrvilleged,
};
