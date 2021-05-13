export const deleteActivity = async ({firebase, id}) => {
    return await firebase.db.collection('activities').doc(id).delete()
}