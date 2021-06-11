import {
    readActivities,
    readUserWithEmail,
    readActivitiesFromStudent,
    readActivitiesFromInstructor,
    readSales, readProducts
} from "./Read";

import {
    createParent,
    createActivity,
    createUser,
    createProduct,

} from "./Create";

import {updateActivity, updateUser, updateProduct} from "./Update";

import Moment from 'moment'
import {extendMoment} from "moment-range";


const moment = extendMoment(Moment)

const getSalesFromDay = async (salesSnapshot, productsSnapshot, firebase) => {
    const salesFromDay = []
    const productsIds = {}


    await productsSnapshot.forEach(product => {
        productsIds[product.id] = true
        const lastRenovation = product.nextRenovation
        const nextRenovation = moment(product.nextRenovation).add(product.renovationSpan, unitsMapper[product.renovationUnit]).format('yyyy-MM-DD')
        firebase.db.collection('products').doc(product.id).update({nextRenovation, lastRenovation})
    })

    salesSnapshot.forEach(sale => {
        if (productsIds[sale.data().product.id] === true) {
            salesFromDay.push(sale)
        }
    })

    return salesFromDay
}

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

const BASIC_DATE_FORMAT = 'yyyy-MM-DD'

const unitsMapper = {
    DAILY: 'days',
    WEEKLY: 'weeks',
    MONTHLY: 'months',
    YEARLY: 'years'
}

export const getSalesFromInterval = async ({after, before, firebase}) => {
    const afterDate = moment(after).subtract(1, 'days')
    const beforeDate = moment(before).add(1, 'days')

    const range = moment().range(afterDate, beforeDate)

    const sales = await readSales({firebase})

    return sales.filter(sale => {
        const saleDate = moment(sale.date)
        return range.contains(saleDate)
    })
}

const sendEmail = async ({firebase, email, product, to_name}) => {
    await firebase.mailServer.sendMail({
        email,
        message: `Se ha registrado la compra de ${product}`,
        to_name,
        template: 'purchase'
    })
}

export const manageSalesFromDay = async ({firebase}) => {
    const currentDay = moment().format(BASIC_DATE_FORMAT)
    const productsSnapshot = await firebase.db.collection('products').where('nextRenovation', '==', currentDay.toString()).get();
    const salesSnapshot = await firebase.db.collection('sales').get()

    const salesFromDay = await getSalesFromDay(salesSnapshot, productsSnapshot, firebase)

    salesFromDay.forEach(doc => {
        registerSale({firebase, ...doc.data()}).then(res => sendEmail({
            email: doc.data().student.email,
            product: doc.data().product.name,
            firebase,
            to_name: doc.data().student.name
        }))
    })
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
    const productRef = await firebase.db.collection('products').doc(product.id)
    const salesRef = await firebase.db.collection('sales').doc()
    try {
        await firebase.db.runTransaction(async t => {
            const productToRead = await t.get(productRef)

            const productData = {...productToRead.data(), id: productToRead.id}

            const previousQuantity = parseInt(productData.quantity)

            const parsedQuantity = parseInt(quantity)

            if (previousQuantity >= parsedQuantity) {
                await t.update(productRef, {quantity: previousQuantity - parsedQuantity})
                await t.set(salesRef, {
                    product: productData,
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