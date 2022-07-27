import "firebase/compat/firestore";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'


const firebaseConfig =  {
      apiKey: "AIzaSyAL9gCVR_2-qqOWwauqDrlMUJwBJdJoSpQ",
      authDomain: "perthtalk-b5fac.firebaseapp.com",
      projectId: "perthtalk-b5fac",
      storageBucket: "perthtalk-b5fac.appspot.com",
      messagingSenderId: "270993703568",
      appId: "1:270993703568:web:2b719a2de80bfceb5cce15",
      measurementId: "G-BT3WVK4DEQ"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const functions = getFunctions(app)
export const st = getStorage(app);

export default {db, functions}
