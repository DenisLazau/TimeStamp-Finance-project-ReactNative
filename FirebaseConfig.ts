import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBBf4o0xkRq4uahE-QM62Xh0AFLUwSmOAE",
  authDomain: "timestampfinance.firebaseapp.com",
  projectId: "timestampfinance",
  storageBucket: "timestampfinance.appspot.com",
  messagingSenderId: "1032687476839",
  appId: "1:1032687476839:web:7640997014b903833cb4c2",
  measurementId: "G-LF740Q6B1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
