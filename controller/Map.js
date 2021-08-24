import * as Location from 'expo-location';
import * as firebase from 'firebase';
import 'firebase/firestore';
import building from '../assets/building.json';

/**
 * function: get my location
 * @return {object} location
 *
 * @typedef {object} location
 * @property {number} latitude
 * @property {number} longitude
 */
async function getMyLocation() {
  await Location.requestBackgroundPermissionsAsync();
  const now = await Location.getCurrentPositionAsync({});

  const location = { latitude: now.coords.latitude, longitude: now.coords.longitude };
  return location;
}

/**
 * function: query building
 * @return {object array} arr
 *
 * @typedef {object} x
 * @property {number} index
 * @property {string} chineseName
 * @property {string} distance
 * @property {number} degree
 * @property {string} units
 */
async function queryBuilding() {
  await Location.requestBackgroundPermissionsAsync();

  const {
    coords: { latitude, longitude, heading },
  } = await Location.getCurrentPositionAsync({});

  const arr = [];

  for (let i = 0; i < building.length; i += 1) {
    const yVec = (building[i].longitude - longitude) * 111.32;
    const xVec = (building[i].latitude - latitude) * 110.574;
    const distance = Math.round(
      Math.sqrt(yVec * yVec + xVec * xVec) * 1000,
    );
    const degree = ((Math.atan2(yVec, xVec) * 180) / Math.PI + heading) % 360;
    arr.push({
      index: building[i].index,
      chineseName: building[i].chineseName,
      distance: `${distance} 公尺`,
      degree,
      units: building[i].units,
    });
  }
  return arr;
}

/**
 * function: Get building
 *
 * @return {x} object
 *
 * @typedef {object} x
 * @property {number} index
 * @property {string} chineseName
 * @property {string} distance
 * @property {number} degree
 * @property {string} units
 */
async function getBuilding(index) {
  await Location.requestBackgroundPermissionsAsync();

  const {
    coords: {
      latitude, longitude, heading,
    },
  } = await Location.getCurrentPositionAsync({});

  const target = building[index];
  const yVec = (target.longitude - longitude) * 111.32;
  const xVec = (target.latitude - latitude) * 110.574;
  const distance = Math.round(
    Math.sqrt(yVec * yVec + xVec * xVec) * 1000,
  );
  const degree = ((Math.atan2(yVec, xVec) * 180) / Math.PI + heading) % 360;
  return {
    index: target.index,
    chineseName: target.chineseName,
    distance: `${distance} 公尺`,
    degree,
    units: target.units,
  };
}

/**
 * function Query all building
 * @param {string} buildingName - name of the building
 * @return {object array} x - building object
 *
 * @typedef {object} x
 * @property {string} chineseName
 * @property {number} latitude
 * @property {number} longitude
 */
async function queryAllBuilding() {
  return building;
}

/**
 * function Query bus
 *
 * @return {object array} arr
 * @typedef {object} x
 * @property {string} busId
 * @property {number} latitude
 * @property {number} longitude
*/
async function getAllBus() {
  const db = firebase.firestore();
  const bus = db.collection('Bus');
  const snapshot = await bus.get();

  const arr = [];
  let x;
  snapshot.forEach((doc) => {
    x = doc.data();
    arr.push(x);
  });

  return arr;
}

export default {
  getMyLocation,
  getBuilding,
  queryBuilding,
  queryAllBuilding,
  getAllBus,
};
