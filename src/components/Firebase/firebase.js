import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/messaging'
import {
    getUser,
    getActivities,
    getInstructors, getActivity, getStudents, getUsers,
    getProducts,
    getProduct,
    getSale,
    getSales
} from "./readOperations";

import {
    removeActivity,
    removeProduct,
    removeSale
} from './deleteOperations'

import {
    createParent,
} from "./Create";

import {
    login,
    signUp, upsertActivity,
    upsertUser,
    getActivitiesByRole,
    upsertProduct,
    registerSale,
    manageSalesFromDay,
    getSalesFromInterval
} from "./complexOperations";
import {addActivity, addSale} from "./createOperations";
import MailServer from "../../utils/MailServer";

const CronJob = require('cron').CronJob;

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
        this.messaging = app.messaging()
        this.mailServer = new MailServer()
        const job = new CronJob(
            '* * * * * *',
            manageSalesFromDay({firebase: this}),
            null,
            true,
            "America/Mexico_City"
        );

        job.start()
    }

    enableMessaging = async () => {
        try {
            await this.messaging.getToken({vapidKey: 'BL3_uK5Nb5OBODRVEtiGpXUVwZsfCI2NdxmiPhajlL5bsiwCHSrCJLnARlxBcs8PpFSp--1_u0s_C4tXtgKLips'})
        } catch (error) {
            console.log(error)
        }
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);


    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    getActivitiesByRole = ({id, role}) => getActivitiesByRole({firebase: this, id, role})

    login = ({email, password}) => login({firebase: this, email, password});

    getActivities = () => getActivities({firebase: this})

    addActivity = ({data}) => addActivity({firebase: this, data})

    getActivity = ({id}) => getActivity({firebase: this, id})

    removeActivity = ({id}) => removeActivity({firebase: this, id})

    removeProduct = ({id}) => removeProduct({firebase: this, id})

    addParent = ({data}) => createParent({firebase: this, data})

    signUp = ({data}) => signUp({firebase: this, data})

    getUser = ({id}) => getUser({firebase: this, id})

    getInstructors = () => getInstructors({firebase: this})

    getUsers = () => getUsers({firebase: this})

    upsertActivity = ({data}) => upsertActivity({firebase: this, data})

    getStudents = () => getStudents({firebase: this})

    upsertUser = ({data}) => upsertUser({firebase: this, data})

    getProducts = () => getProducts({firebase: this})


    upsertProduct = ({data}) => upsertProduct({firebase: this, data})

    addSale = ({data}) => addSale({firebase: this, data})

    removeSale = ({id}) => removeSale({firebase: this, id})

    getSale = ({id}) => getSale({firebase: this, id})

    getSales = () => getSales({firebase: this})

    registerSale = ({product, student, quantity}) => registerSale({
        firebase: this,
        product,
        student,
        quantity
    })

    getSalesFromInterval = ({after, before}) => getSalesFromInterval({firebase: this, after, before})

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;
