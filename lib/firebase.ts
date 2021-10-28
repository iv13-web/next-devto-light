import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyC8qVgUqfrPMUJ7oHJq8iVONLx0T1VVRXY",
	authDomain: "devto-clone-34250.firebaseapp.com",
	projectId: "devto-clone-34250",
	storageBucket: "devto-clone-34250.appspot.com",
	messagingSenderId: "89012662879",
	appId: "1:89012662879:web:4385a8fd316ef71c3a61ea",
	measurementId: "G-KZSF1P0VHP"
}

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
