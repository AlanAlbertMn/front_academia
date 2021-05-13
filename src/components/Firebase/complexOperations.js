import {
    readActivities,
    readUser,
    readActivitiesFromStudent,
    readActivitiesFromInstructor
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
    } else if (data.email) {
        return firebase.auth.createUserWithEmailAndPassword(data.email, data.password).then(res => createUser({
            firebase,
            data
        }))
    } else {
        return createUser({
            firebase,
            data
        })
    }
}

export const getActivitiesByRole = async ({firebase, id, role}) => {
    if (role === 'ADMIN') {
        return readActivities({firebase})
    } else if (role === 'STUDENT') {
        return readActivitiesFromStudent({firebase, id})
    } else if (role === 'INSTRUCTOR') {
        return readActivitiesFromInstructor({firebase, id})
    }
}