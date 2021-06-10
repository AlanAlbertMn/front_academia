import moment from 'moment'

const unitsMapper = {
    DAILY: 'days',
    WEEKLY: 'weeks',
    MONTHLY: 'months',
    YEARLY: 'years'
}

export const createProduct = async ({firebase, data}) => {
    if (data.autorenovable === true) data.nextRenovation = moment(data.lastRenovation).add(data.renovationSpan, unitsMapper[data.renovationUnit]).format('yyyy-MM-DD')

    const productCreated = await firebase.db.collection('products').add(data);

    return {
        activity: productCreated
    }
}