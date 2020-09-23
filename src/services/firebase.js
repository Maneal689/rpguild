import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";

const firebaseConf = {
  apiKey: "AIzaSyCtyKQVnoa9jLFga1wlCvgLsLXoz7I5euU",
  authDomain: "rpguild-4d0e2.firebaseapp.com",
  databaseURL: "https://rpguild-4d0e2.firebaseio.com",
  projectId: "rpguild-4d0e2",
  storageBucket: "rpguild-4d0e2.appspot.com",
  messagingSenderId: "224684117076",
  appId: "1:224684117076:web:57903b5193f8a2eb39f1c1",
  measurementId: "G-7SJE8PDJ7T",
};

if (!(firebase.apps.length > 0)) {
  firebase.initializeApp(firebaseConf);
  firebase.analytics();
}

firebase.auth().useDeviceLanguage();

export const auth = firebase.auth;
export const db = firebase.firestore();
export const firestore = firebase.firestore;
