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
    createProduct
} from "./Create";

import {updateActivity, updateUser, updateProduct} from "./Update";

import Moment from 'moment'
import {extendMoment} from "moment-range";


const moment = extendMoment(Moment)

const getSalesFromDay = (salesSnapshot, productsSnapshot) => {
    const salesFromDay = []
    const productsIds = {}

    productsSnapshot.forEach(product => {
        productsIds[product.id] = true
    })

    console.log(productsIds)

    salesSnapshot.forEach(sale => {
        console.log(sale.data())
        if (productsIds[sale.data().product.id] === true){
            salesFromDay.push(sale)
        }
    })

    console.log(salesFromDay)

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
    const afterDate = moment(after)
    const beforeDate = moment(before)

    const range = moment().range(afterDate, beforeDate)

    const sales = await readSales({firebase})

    return sales.filter(sale => {
        const saleDate = moment(sale.date)

        return range.contains(saleDate)
    })
}


export const manageSalesFromDay = async({firebase}) => {
    const currentDay = moment().format('yyyy-MM-DD')
    const productsSnapshot = await firebase.db.collection('products').where('nextRenovation','==', currentDay.toString()).get();
    const salesSnapshot = await firebase.db.collection('sales').get()

    const salesFromDay = getSalesFromDay(salesSnapshot, productsSnapshot)
    console.log('llegando hasta aca');

    salesFromDay.forEach(doc => {
        console.log(doc.data());
    })

    // if (productsSnapshot.empty) {
    //     console.log('no hay')
    //     return []
    // } else {
    //     await salesSnapshot.forEach(doc => {
    //         const docData = doc.data()
    //
    //         const nextRenovation = moment(docData.lastRenovation).add(docData.renovationSpan, unitsMapper[docData.renovationUnit]).format('yyyy-MM-DD')
    //
    //         doc.update({nextRenovation})
    //
    //         console.log('CRON executed')
    //     })
    //     return
    // }
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

            const productData = productToRead.data()

            const previousQuantity = parseInt(productData.quantity)

            const parsedQuantity = parseInt(quantity)

            if (previousQuantity >= parsedQuantity) {
                await t.update(productRef, {quantity: previousQuantity - parsedQuantity})
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