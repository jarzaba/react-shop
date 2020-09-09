import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC81dHwjmpUXS-krVHnFOuier7h3roXTfQ',
  authDomain: 'e-commerce-db-2f4b0.firebaseapp.com',
  databaseURL: 'https://e-commerce-db-2f4b0.firebaseio.com',
  projectId: 'e-commerce-db-2f4b0',
  storageBucket: 'e-commerce-db-2f4b0.appspot.com',
  messagingSenderId: '566610555515',
  appId: '1:566610555515:web:e4b823314eb2b37c4928de',
  measurementId: 'G-C8FCFDM0KC',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
