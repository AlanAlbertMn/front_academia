import {
    readUser
} from "./Read";

import {
    createParent,
    createActivity,
    createUser,
} from "./Create";
import {updateActivity, updateUser} from "./Update";


export const login = async ({firebase, email, password}) => {
    try {
        await firebase.doSignInWithEmailAndPassword(email, password)

        const user = await readUser({firebase, email})

        return {
            user
        }

    } catch (error) {
        return error
    }
}

export const signUp = async ({firebase, data}) => {
    try {
        await firebase.auth.createUserWithEmailAndPassword(data.email, data.password);
        await createParent({firebase, data})

        return true
    } catch (error) {
        return error
    }
}


export const upsertActivity = async ({firebase, data}) => {
    if (data.id && data.shouldUpdate) {
        return updateActivity({firebase, data})
    } else {
        return createActivity({firebase, data})
    }
}

export const upsertUser = async ({firebase, data}) => {
    if (data.id) {

        return updateUser({firebase, data})
    } else {
        return firebase.auth.createUserWithEmailAndPassword(data.email, data.password).then(res => createUser({
            firebase,
            data
        }))
    }
}