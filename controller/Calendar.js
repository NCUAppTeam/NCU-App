import * as firebase from 'firebase';
import { Alert } from 'react-native';

/**
 * Create a new schedule
 *
 * @param {object} schedule - The schedule object.
 * @param {string} schedule.name - The name of the schedule.
 * @param {boolean} schedule.public - Is the schedule public visible.
 * @param {timestamp} schedule.startTime - The start time of the schedule.
 * @param {timestamp} schedule.endTime - The end time of the schedule.
 * @param {string} schedule.location - The location for the schedule.
 * @param {string} schedule.link - The link for the schedule.
 * @param {string} schedule.content - Additional content for the schedule.
 * @param {string} schedule.eventId - If not null, the schedule is from an event.
 *
 * @returns {string} id of the new event
 */
async function createSchedule(schedule) {
  try {
    const db = firebase.firestore();
    const res = await db.collection('CalendarEvents')
      .add({
        uid: firebase.auth().currentUser.uid,
        name: schedule.name,
        public: false, // Only reviewed schedule can be public
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        location: schedule.location,
        link: schedule.link,
        content: schedule.content,
        eventId: schedule.eventId,
      });
    return res.id;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

/**
 * Modify an schedule
 *
 * @param {object} schedule - The schedule object.
 * @param {string} schedule.id - ID of the schedule.
 * @param {string} schedule.name - The name of the schedule.
 * @param {string} schedule.location - The location for the schedule.
 * @param {boolean} schedule.public - Is the schedule public visible.
 * @param {timestamp} schedule.startTime - The start time of the schedule.
 * @param {timestamp} schedule.endTime - The end time of the schedule.
 */
async function modifySchedule(schedule) {
  try {
    const db = firebase.firestore();
    db.collection('CalendarEvents')
      .doc(schedule.id)
      .set({
        uid: firebase.auth().currentUser.uid,
        name: schedule.name,
        public: schedule.public,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        location: schedule.location,
        link: schedule.link,
        content: schedule.content,
        eventId: schedule.eventId,
      });
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }
}

/**
 * Delete an old event
 *
 * @param {string} eventID - id of the event
 * @returns {Object} res
 */
async function deleteEvent(eventID) {
  try {
    const db = firebase.firestore();
    const res = await db.collection('CalendarEvents').doc(eventID).delete();
    return res;
  } catch (err) {
    await Alert.alert('There is something wrong!!!!', err.message);
  }

  return null;
}

/**
 * Get data of an event
 *
 * dataObj type definition
 * @typedef {object} dataObj
 * @property {string} type - event or reminder
 * @property {string} name - event name
 * @property {object} notification
 * @property {boolean} public - if this event is public
 * @property {timestamp} startTime - the time when the event start
 * @property {timestamp} endTime - the time when the event end
 *
 * @param {string} eventID - id of the event
 * @returns {dataObj} data
 */
async function getEventInfo(eventID) {
  const db = firebase.firestore();
  const doc = await db.collection('CalendarEvents').doc(eventID).get();

  if (!doc.exists) {
    // await Alert.alert('No event data found!');
  } else {
    const dataObj = doc.data();
    return dataObj;
  }

  return null;
}

/**
 * Get all events that are created by the user in calendar
 *
 * @returns {Array} userEvents (id of the events)
 */
async function getUserCalendar() {
  const db = firebase.firestore();
  const calendarEventRef = await db.collection('CalendarEvents');
  const { uid } = firebase.auth().currentUser;
  const calendarEventQueryRes = await calendarEventRef.where('uid', '==', uid).orderBy('startTime').get();

  const userEvents = [];
  calendarEventQueryRes.forEach((doc) => {
    userEvents.push({ id: doc.id, data: doc.data() });
  });
  return userEvents;
}

export default {
  createSchedule,
  modifySchedule,
  deleteEvent,
  getEventInfo,
  getUserCalendar,
};
