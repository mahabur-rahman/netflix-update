import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBYDb-_hTsoPL-aZnLo0zkW0ZPv2B7ti-c",
  authDomain: "netflix-43225.firebaseapp.com",
  projectId: "netflix-43225",
  storageBucket: "netflix-43225.appspot.com",
  messagingSenderId: "982651744138",
  appId: "1:982651744138:web:59d6f907ef681888a9e273",
  measurementId: "G-SZMGC7YMK0",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;
