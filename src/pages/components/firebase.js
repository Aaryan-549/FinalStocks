
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu0DJKYskShtg6BNa04-oDCYKA4tPml-w",
  authDomain: "wdsstocks-10.firebaseapp.com",
  projectId: "wdsstocks-10",
  storageBucket: "wdsstocks-10.firebasestorage.app",
  messagingSenderId: "676084590635",
  appId: "1:676084590635:web:7855451875838781e7a26e",
  measurementId: "G-6RM363GTWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db}