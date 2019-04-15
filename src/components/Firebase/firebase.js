import app from 'firebase/app';

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
      }
  }

  export default Firebase;
