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

export const readProductsFromStudent = async ({firebase, id}) => {
    const productsSnapshot = await firebase.db.collection('products').where('inscribed', 'array-contains', id).get();

    let formattedProducts = []

    if (productsSnapshot.empty) {
        return []
    } else {
        productsSnapshot.forEach(doc => formattedProducts.push({...doc.data(), id: doc.id}))
        return formattedProducts
    }
}

export const readProductsFromInstructor = async({firebase, id}) => {
    console.log('EL ID ENVIADO ES', id)
    const productsSnapshot = await firebase.db.collection('products').where('instructors', 'array-contains', id).get();

    let formattedProducts = []

    if (productsSnapshot.empty) {
        return []
    } else {
        productsSnapshot.forEach(doc => formattedProducts.push({...doc.data(), id: doc.id}))
        return formattedProducts
    }
}


export const readProduct = async ({firebase, id}) => {
    const productsSnapshot = await firebase.db.collection('products').doc(id).get();


    if (productsSnapshot.empty) {
        throw new Error('El producto solicitado no fue encontrado')
    }

    return {...productsSnapshot.data(), id: productsSnapshot.id}
}
