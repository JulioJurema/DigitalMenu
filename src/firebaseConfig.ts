
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
 
const firebaseConfig = {
  apiKey: "AIzaSyB4Xkkk-jTHhocFTe4JKIobySE0KBWV9M4",
  authDomain: "cardapiopararestaurante.firebaseapp.com",
  projectId: "cardapiopararestaurante",
  storageBucket: "cardapiopararestaurante.appspot.com",
  messagingSenderId: "1021068685336",
  appId: "1:1021068685336:web:16417ff0e04eff24ea936d",
  measurementId: "G-WNYBM7B3RG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
