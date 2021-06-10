export const deleteProduct = async ({firebase, id}) => {
    return await firebase.db.collection('products').doc(id).delete()
}