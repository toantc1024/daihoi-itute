// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { User } from "@/types/user/userProfile.type";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const createPresentator = (
  password: string,
  profile: User
): Promise<UserCredential> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();

    const user = createUserWithEmailAndPassword(auth, profile.email, password)
      .then((user) => {
        // add user to firestore
        const userRef = doc(db, "users", user.user.uid);
        setDoc(userRef, profile)
          .then(() => resolve(user))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

const getUserProfileByID = async (uid: string): Promise<any> => {
  const userRef = doc(db, "users", uid);
  const userProfile = await getDoc(userRef);
  return userProfile.data();
};

const signIn = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserCredential> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};

export { getAuth, createPresentator, getUserProfileByID, signIn, db };
