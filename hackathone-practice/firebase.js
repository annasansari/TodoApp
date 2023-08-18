import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

 
  const firebaseConfig = {
    apiKey: "AIzaSyCpYA04UxbBtdx9REu8XKLJBf6-iXZPsZM",
    authDomain: "chatapp-3b94e.firebaseapp.com",
    projectId: "chatapp-3b94e",
    storageBucket: "chatapp-3b94e.appspot.com",
    messagingSenderId: "60591552131",
    appId: "1:60591552131:web:e1fe24ee969ec6eecd0db6",
    measurementId: "G-3682ZNNYR7"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
