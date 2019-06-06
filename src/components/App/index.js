import React, { Component } from 'react';

import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' 
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

import createStore from '../../redux/createReduxStore'
import fbConfig from '../../redux/firebaseConfig'

import RouterElement from './routing'

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const store = createStore()

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}


firebase.initializeApp(fbConfig)
firebase.firestore();


const App = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <RouterElement />
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default App
