export  const updateUser = async ({firebase, data}) => {
    return await firebase.db.collection('users').doc(data.id).set(data)
}