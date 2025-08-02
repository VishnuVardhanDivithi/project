import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBPmktpV-loZzzxIl-SJ7WiGWXJxnCNX0o",
  authDomain: "project1-526e9.firebaseapp.com",
  databaseURL: "https://project1-526e9-default-rtdb.firebaseio.com",
  projectId: "project1-526e9",
  storageBucket: "project1-526e9.firebasestorage.app",
  messagingSenderId: "388214534427",
  appId: "1:388214534427:web:e9b3f48d1100199d63a3be",
  measurementId: "G-M6Y814L0WH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;