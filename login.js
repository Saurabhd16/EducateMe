import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js"
import { getDatabase,set,ref, update } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyACm1krLMI04toFcS30Q-5pmWyiDGnbBWU",
    authDomain: "authetication-c3226.firebaseapp.com",
    databaseURL: "https://authetication-c3226-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "authetication-c3226",
    storageBucket: "authetication-c3226.appspot.com",
    messagingSenderId: "185367619832",
    appId: "1:185367619832:web:635baa9de08235e28f330d"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const signupButton = document.getElementById('signup');
signupButton.addEventListener('click', (e) => {
  e.preventDefault();
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let username = document.getElementById('username').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, 'Users/' + user.uid), {
        username: username,
        email: email
      })
      alert('Successfully signed up');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

const loginButton = document.getElementById('login');
loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  let login_email = document.getElementById('login_email').value;
  let login_password = document.getElementById('login_password').value;

  signInWithEmailAndPassword(auth, login_email, login_password)
    .then((userCredential) => {
      const user = userCredential.user;
      const dt = new Date();
      update(ref(database, 'Users/' + user.uid), {
        last_login: dt,
      });

      // Retrieve username from the database
      const userRef = ref(database, 'Users/' + user.uid);
      get(userRef).then((snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          const username = userData.username;
          alert('Welcome, ' + username);
        } else {
          alert('Welcome');
        }
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
