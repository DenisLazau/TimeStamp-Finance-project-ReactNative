import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDrgmRL7syEx-ohms-J-yLc5I6OcAnFl8E",
  authDomain: "ionic-smart-reporter-567e6.firebaseapp.com",
  projectId: "ionic-smart-reporter-567e6",
  storageBucket: "ionic-smart-reporter-567e6.appspot.com",
  messagingSenderId: "1047691467068",
  appId: "1:1047691467068:web:4c2c1bbafdca8072292639"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
