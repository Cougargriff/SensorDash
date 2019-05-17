import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDWVY7nT6RD0vRlQsI5D3We495fJfwJvrE",
  authDomain: "sensor-triggers.firebaseapp.com",
  databaseURL: "https://sensor-triggers.firebaseio.com",
  projectId: "sensor-triggers",
  storageBucket: "sensor-triggers.appspot.com",
  messagingSenderId: "944660032464"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }


  // ** Auth Interface **
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
  this.auth.currentUser.updatePassword(password);

  // *** Firestore Interface ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

}





export default Firebase;
