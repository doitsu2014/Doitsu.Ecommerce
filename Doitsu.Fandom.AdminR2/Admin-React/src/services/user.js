import firebase from 'firebase/app'
import { notification } from 'antd'
import notifyError from 'utils/errorHandler'
import UserApi from './apis/UserApi'

import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import Utils from '../utils'

const firebaseConfig = {
  apiKey: 'AIzaSyAE5G0RI2LwzwTBizhJbnRKIKbiXQIA1dY',
  authDomain: 'cleanui-72a42.firebaseapp.com',
  databaseURL: 'https://cleanui-72a42.firebaseio.com',
  projectId: 'cleanui-72a42',
  storageBucket: 'cleanui-72a42.appspot.com',
  messagingSenderId: '583382839121',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebase.auth
export default firebaseApp

export async function login(email, password) {
  return firebaseAuth()
    .signInWithEmailAndPassword(email, password)
    .then(() => true)
    .catch(error => {
      notification.warning({
        message: error.code,
        description: error.message,
      })
    })
}

export async function loginByYGFL(email, password) {
  try {
    const response = await UserApi.getAuthorize(email, password)
    return response
  } catch (e) {
    notifyError(e)
    return null
  }
}

export async function currentAccountYGFL() {
  return Utils.GetCurrentUser()
}

export async function currentAccount() {
  let userLoaded = false
  function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
      if (userLoaded) {
        resolve(firebaseAuth.currentUser)
      }
      const unsubscribe = auth.onAuthStateChanged(user => {
        userLoaded = true
        unsubscribe()
        resolve(user)
      }, reject)
    })
  }
  return getCurrentUser(firebaseAuth())
}

export function logoutYGFL() {
  Utils.SetCurrentUser('')
  return true
}
export async function logout() {
  return firebaseAuth()
    .signOut()
    .then(() => true)
}
