import app from 'firebase/app';
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDafuw7JtD5gQy57nsG13Uw6mZ2FFt5NBY',
  authDomain: 'administracion-academia.firebaseapp.com',
  projectId: 'administracion-academia',
  storageBucket: 'administracion-academia.appspot.com',
  messagingSenderId: '406507506526',
  appId: '1:406507506526:web:bb788d539601deb0f19dcf',
  measurementId: 'G-RSSHL2D4DT',
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth()
  }

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password)
  doSignOut = () => this.auth.signOut()
}

export default Firebase;
