// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTI9IdCoCRFQjL_8rhHzvvT8Gxbyecolk",
    authDomain: "miniblog-5a0bc.firebaseapp.com",
    projectId: "miniblog-5a0bc",
    storageBucket: "miniblog-5a0bc.appspot.com",
    messagingSenderId: "8466609645",
    appId: "1:8466609645:web:509947e688dec7d404a3e4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };
