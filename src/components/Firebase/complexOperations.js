import {
    readUser
} from "./Read";

import  {
    createParent
} from "./Create";


export const login =  async ({firebase, email, password}) => {
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

export const signUp = async({firebase, data}) => {
    try {
        await firebase.auth.createUserWithEmailAndPassword(data.email, data.password);
        await createParent({firebase, data})

        return true
    } catch (error) {
        return error
    }
}