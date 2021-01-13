// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXaEZ5mBVVSk01Bk7zMeUqdJT12hzL8tg",
  authDomain: "riasam-3e987.firebaseapp.com",
  projectId: "riasam-3e987",
  storageBucket: "riasam-3e987.appspot.com",
  messagingSenderId: "385262998842",
  appId: "1:385262998842:web:f4d95c855b2206511cac03",
  measurementId: "G-HLSSBZG29V"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//provider authentication
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
    .then( function (result) {
      console.log(result)
    })
    .catch(function (error){
      console.error(error)
    });
}
