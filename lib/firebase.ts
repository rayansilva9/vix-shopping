import Firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const config = {
  apiKey: 'AIzaSyCM38Sw9fJL3Mjb_h5WTK8Q0n7_cKXxW2U',
  authDomain: 'noir-shop.firebaseapp.com',
  projectId: 'noir-shop',
  storageBucket: 'noir-shop.appspot.com',
  messagingSenderId: '209455276151',
  appId: '1:209455276151:web:f81e0e8dbeb945b607a672',
  measurementId: 'G-0SJ61TBK4Q'
}

const firebase = Firebase.initializeApp(config)
// const { FieldValue } = Firebase.firestore
// const deleteDoc = firebase.firestore
// const doc = firebase.firestore
const db = firebase.firestore()
const storage = firebase.storage('gs://noir-shop.appspot.com')
// const database = firebase.database()

export { firebase, storage, db }
