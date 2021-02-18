// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
	apiKey: "AIzaSyBoPJE250WM7Iw4KxKTHnUESZhh6aV_lrI",
	authDomain: "clone-ac7ee.firebaseapp.com",
	projectId: "clone-ac7ee",
	storageBucket: "clone-ac7ee.appspot.com",
	messagingSenderId: "925580520973",
	appId: "1:925580520973:web:e1d8f9ff86afd51b59ef44",
	measurementId: "G-N87ZCXD2BP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };