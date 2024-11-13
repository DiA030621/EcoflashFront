import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDGLbH0DjAdhJbjTy7DMBIXg1OFjeht2PE",
      authDomain: "p11-22.firebaseapp.com",
      databaseURL: "https://p11-22-default-rtdb.firebaseio.com",
      projectId: "p11-22",
      storageBucket: "p11-22.appspot.com",
      messagingSenderId: "8022651113",
      appId: "1:8022651113:web:d16e3f236c823d2f95c078",
      measurementId: "G-CE70XEQSZ5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);