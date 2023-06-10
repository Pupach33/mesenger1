import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider } from "firebase/auth"
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyAe2R6dTvTrOxj7EByrWQS1ECXntcqMOho",

  authDomain: "mesenger-69e05.firebaseapp.com",

  projectId: "mesenger-69e05",

  storageBucket: "mesenger-69e05.appspot.com",

  messagingSenderId: "1064522694000",

  appId: "1:1064522694000:web:023a8991e5eb797662e3b5",

  measurementId: "G-SF2H042MF3"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
 