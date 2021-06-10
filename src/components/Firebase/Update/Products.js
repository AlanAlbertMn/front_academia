export const updateProduct = async ({firebase, data}) => {
    return await firebase.db.collection('products').doc(data.id).set(data)
}