export const readSales = async ({firebase}) => {
    const salesSnapshot = await firebase.db.collection('sales').get();

    let formattedSales = []

    if (salesSnapshot.empty) {
        return []
    } else {
        salesSnapshot.forEach(doc => formattedSales.push({...doc.data(), id: doc.id}))
        return formattedSales
    }
}

export const readSale = async({firebase, id}) => {
    const saleSnapshot = await firebase.db.collection('sales').doc(id).get()

    if (saleSnapshot.empty) return null

    return {...saleSnapshot.data(), id: saleSnapshot.id}
}