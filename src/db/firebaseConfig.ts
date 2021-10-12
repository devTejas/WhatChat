// @ts-ignore
import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAk83ewYzjIdPt2KWPx3RVkvo3kQMG1E0o",
  authDomain: "whatchat-11.firebaseapp.com",
  projectId: "whatchat-11",
  storageBucket: "whatchat-11.appspot.com",
  messagingSenderId: "825511695127",
  appId: "1:825511695127:web:80c7f5cdc8c4b6368d9d52",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
