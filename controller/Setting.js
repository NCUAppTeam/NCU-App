/* eslint-disable no-console */
/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import { getApp } from 'firebase/app'
import {
  getFirestore, query, getDoc, doc, deleteDoc, updateDoc
} from 'firebase/firestore'
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject
} from 'firebase/storage'
import Fuse from 'fuse.js'
import UserController from './getStudentId'

const app = getApp()
const storage = getStorage()

/**
 *Image url link processing
 * 
 * @param {*} imageUri
 * @returns
 */
function imagePos (imageUri) {
  return imageUri.split('/').pop()
}

/**
 *
 * @param {*} active
 */
async function changeAvatar (pic) {
  const UserStudent = UserController.getUid()
  const imageAddress = `avatar/${imagePos(pic)}`
  const storageRef = ref(storage, imageAddress)
  const response = await fetch(pic)
  const blob = await response.blob()
  const uploadTask = await uploadBytes(storageRef, blob)
  const url = await getDownloadURL(uploadTask.ref)
  const db = getFirestore(app)
  const attendeesRef = query(doc(db, 'attendees', UserStudent))

  const info = await getDoc(attendeesRef)
  const deleteRef = ref(storage, `avatar/${info.data().avatar.substr(-94, 41)}`)
  deleteObject(deleteRef).then(() => {
    console.log('old avatar has been deleted!')
  }).catch((err) => {
    console.log(err)
  })

  await updateDoc(attendeesRef, { avatar: url }, { merge: true }).then(() => {
    console.log('changeAvatar Successful')
  }).catch((error) => {
    console.log(error)
  })
}

async function updateInfo (uid, newUserInfo) {
  const db = getFirestore(app)
  const memberInfo = newUserInfo

  await updateDoc(doc(db, 'attendees', `${uid}`), memberInfo, { merge: true })
    .then(console.log('succeed'))
    .catch((error) => {
      console.log(error)
    })
}

async function deleteUserInfo(uid) {
  const db = getFirestore(app)
  
  // delete user info in the database
  await deleteDoc(doc(db, 'attendees', `${uid}`))
    .then(console.log('delete user info succeed'))
    .catch((error) => {
      console.log(error)
    })

}


export default {
  changeAvatar,
  updateInfo, 
  deleteUserInfo
}
