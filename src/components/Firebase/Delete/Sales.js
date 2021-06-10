export const deleteSale = async ({firebase, id}) => {
    return await firebase.db.collection('sales').doc(id).delete()
}