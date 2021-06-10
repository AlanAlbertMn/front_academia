import {
    readActivities,
    readUserWithEmail,
    readActivitiesFromStudent,
    readActivitiesFromInstructor,
} from "./Read";

import {
    createParent,
    createActivity,
    createUser,
    createProduct
} from "./Create";

import {updateActivity, updateUser, updateProduct} from "./Update";

import moment from 'moment'

export const login = async ({firebase, email, password}) => {
    try {
        await firebase.doSignInWithEmailAndPassword(email, password)

        const user = await readUserWithEmail({firebase, email})

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

export const upsertProduct = async ({firebase, data}) => {
    if (data.id) {
        return updateProduct({firebase, data})
    } else {
        return createProduct({firebase, data})
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

export const registerSale = async ({firebase, product, student, quantity}) => {
    const productRef = firebase.db.collection('products').doc(product.id)
    const salesRef = firebase.db.collection('sales').doc()

    try {
        await firebase.db.runTransaction(async t => {
            const productToRead = await t.get(productRef)

            if (productToRead.data().quantity >= quantity) {
                await t.update(productRef, {quantity: productToRead.data().quantity - quantity})
                await t.set(salesRef, {
                    product: productToRead.data(),
                    student,
                    quantity,
                    total: quantity * productToRead.data().cost,
                    date: moment().format()
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}