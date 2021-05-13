export  const updateActivity = async ({firebase, data}) => {
    return await firebase.db.collection('activities').doc(data.id).set(data)
}