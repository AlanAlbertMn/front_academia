export const readUser = async ({firebase, email}) => {

    const usersSnapshot = await firebase.db.collection('users').where('email', '==', email).get();

    if (usersSnapshot.empty) {
        throw new Error('El usuario buscado no se encuentra registrado')
    }

    return {...usersSnapshot.docs[0].data(), id: usersSnapshot.docs[0].id}

}