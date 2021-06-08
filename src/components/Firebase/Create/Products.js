export const createProduct = async ({firebase, data}) => {
    const productCreated = await firebase.db.collection('products').add(data);

    return {
        product: productCreated
    }
}