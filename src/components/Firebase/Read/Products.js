export const readProducts = async ({firebase}) => {
    const productsSnapshot = await firebase.db.collection('products').get();

    let formattedProducts = []

    if (productsSnapshot.empty) {
        return []
    } else {
        productsSnapshot.forEach(doc => formattedProducts.push({...doc.data(), id: doc.id}))
        return formattedProducts
    }
}

export const readProduct = async({firebase, id}) => {
    const productSnapshot = await firebase.db.collection('products').doc(id).get()

    if (productSnapshot.empty) return null

    return {...productSnapshot.data(), id: productSnapshot.id}
}