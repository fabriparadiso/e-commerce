import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC3sZmueTanclygZRateo8eQJd17xGp_dY",

  authDomain: "rosariostore2022.firebaseapp.com",

  projectId: "rosariostore2022",

  storageBucket: "rosariostore2022.appspot.com",

  messagingSenderId: "967801327164",

  appId: "1:967801327164:web:860acbdd342fdb0180bd39"

};



const app = firebase.initializeApp(firebaseConfig)

export default function getFirestoreApp(){
    return app
}

export const auth = firebase.auth();
