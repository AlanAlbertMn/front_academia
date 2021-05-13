import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import {
    getUser,
    getActivities
} from "./readOperations";

import {
    removeActivity
} from './deleteOperations'

import {
    createParent,
    createUser
} from "./Create";

import {
    login,
    signUp
} from "./complexOperations";


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
        this.auth = app.auth();
        this.db = app.firestore()
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    login = ({email, password}) => login({firebase: this, email, password});

    getActivities = () => getActivities({firebase: this})

    removeActivity = ({id}) => removeActivity({firebase: this, id})

    addParent = ({data}) => createParent({firebase: this, data})

    addUser = ({data}) => createUser({firebase: this, data})

    signUp = ({data}) => signUp({firebase: this, data})

    getUser = ({email}) => getUser({firebase: this, email})

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;
