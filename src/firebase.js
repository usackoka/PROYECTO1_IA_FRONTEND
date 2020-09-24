import * as firebase from 'firebase';
import 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDIbPBn7BYO5x-b0DWoz8ZALJG1qHWbdTs",
    authDomain: "ia-proyecto1.firebaseapp.com",
    databaseURL: "https://ia-proyecto1.firebaseio.com",
    projectId: "ia-proyecto1",
    storageBucket: "ia-proyecto1.appspot.com",
    messagingSenderId: "709961498361",
    appId: "1:709961498361:web:2012c6fd6885a0a6c7ec28",
    measurementId: "G-BTKZBMHF5G"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore()