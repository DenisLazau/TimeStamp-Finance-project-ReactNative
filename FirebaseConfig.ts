import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyDrgmRL7syEx-ohms-J-yLc5I6OcAnFl8E",
    authDomain: "ionic-smart-reporter-567e6.firebaseapp.com",
    projectId: "ionic-smart-reporter-567e6",
    storageBucket: "ionic-smart-reporter-567e6.appspot.com",
    messagingSenderId: "1047691467068",
    appId: "1:1047691467068:web:4c2c1bbafdca8072292639"
  };

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);