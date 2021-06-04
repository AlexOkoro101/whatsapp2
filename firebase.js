import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBXl2MK3AJ6ZxPGtCwn8pVl8uPyw3pnH4k",
    authDomain: "whatsapp2-3ec36.firebaseapp.com",
    projectId: "whatsapp2-3ec36",
    storageBucket: "whatsapp2-3ec36.appspot.com",
    messagingSenderId: "1054906394606",
    appId: "1:1054906394606:web:d22bb81cae89bd58e1d0ff"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider};