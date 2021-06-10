export const createSale = async ({firebase, data}) => {
    const saleCreated = await firebase.db.collection('sales').add(data);

    return {
        activity: saleCreated
    }
}