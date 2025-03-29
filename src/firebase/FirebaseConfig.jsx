import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcRocCXezAnC_-MfYWID6zqYcr_8D-FpM",
  authDomain: "reactfirebaseapp-b1e4c.firebaseapp.com",
  projectId: "reactfirebaseapp-b1e4c",
  storageBucket: "reactfirebaseapp-b1e4c.firebasestorage.app",
  messagingSenderId: "490666910843",
  appId: "1:490666910843:web:2478b8b0966a656b9daede",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage };
