import { getApp, firebase } from 'firebase/app'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Get all ads
 *
 * @returns {Array} A array of ads.
 */

async function getAds () {
  const db = firebase.firestore()
  const adsRef = db.collection('Ads')

  const response = []
  const querySnapshot = await adsRef.get()
  querySnapshot.forEach((doc) => {
    response.push({ id: doc.id, data: doc.data() })
  })

  return response
}

async function getWeather () {
  const query = {
    variables: 'DateTimeUTC,CWB_Temperature,CWB_Humidity,CWB_Pressure,CWB_WindDirection,CWB_WindSpeed,CWB_Rain05,ShortWaveDown',
    time: new Date().toISOString().slice(0, -8),
    mode: 'auto',
    lab: 'CA',
    rec_var: 'CWB_Temperature'
  }
  const param = new URLSearchParams(query).toString()

  const res = {}

  const response = await fetch('http://140.115.35.136:8044/cgi-bin/getData_latest.py', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    },
    body: param
  })
  const temp = await response.json()
  res.temperature = temp.CWB_Temperature
  res.humidity = temp.CWB_Humidity

  return res
}

async function setStoredIP (value) {
  await AsyncStorage.setItem('@user_ip', value)
}

async function getStoredIP () {
  const value = await AsyncStorage.getItem('@user_ip')
  if (value == null) throw new Error('No stored IP')
  return value
}

async function getNetFlowByIP (ip) {
  try {
    const regex = new RegExp(/(\d+.\d+ GB)/, 'g')
    const response = await fetch(`https://uncia.cc.ncu.edu.tw/dormnet/index.php?section=netflow&ip=${ip}`)
    const str = await response.text()
    if (str === undefined) throw new Error('Unable to fetch netflow data, empty return.')
    const netFlow = []
    netFlow.push(Number(((str.match(regex))[0]).split(' ')[0]))
    netFlow.push(Number(((str.match(regex))[1]).split(' ')[0]))
    return netFlow
  } catch (e) {
    return [0, 0]
  }
}

async function getCalender () {
  const app = getApp()
  const db = getFirestore(app)
  const Doc = doc(db, 'other/links')
  const querySnapshot = await getDoc(Doc)
  return querySnapshot.data().calendarLink
}

async function getTutorial () {
  const app = getApp()
  const db = getFirestore(app)
  const Doc = doc(db, 'other/tutorial')
  const querySnapshot = await getDoc(Doc)
  const result = []
  Object.keys(querySnapshot.data()).forEach((i) => {
    result.push(querySnapshot.data()[i])
  })
  return result
}

export default {
  getAds,
  getWeather,
  getNetFlowByIP,
  getStoredIP,
  setStoredIP,
  getCalender,
  getTutorial
}
