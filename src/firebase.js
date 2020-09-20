import * as firebase from 'firebase';
import 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBnTyCwJtKs7xpsQo0aFrQh-xj2efo3Of0",
    authDomain: "ia-practica1.firebaseapp.com",
    databaseURL: "https://ia-practica1.firebaseio.com",
    projectId: "ia-practica1",
    storageBucket: "ia-practica1.appspot.com",
    messagingSenderId: "871800886497",
    appId: "1:871800886497:web:d984fe935118fdbfaf93a0",
    measurementId: "G-FT0SV5KKB0"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore()