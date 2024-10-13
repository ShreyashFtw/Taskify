// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZFXaQIBY5dZ_chhbFtqVkQl4NXmp4g2w",
  authDomain: "taskify-9b87d.firebaseapp.com",
  projectId: "taskify-9b87d",
  storageBucket: "taskify-9b87d.appspot.com",
  messagingSenderId: "501884146821",
  appId: "1:501884146821:web:b73f3142f29d894dfb05ec",
  measurementId: "G-BRZFY63L2N"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);