export const deleteActivity = async ({firebase, id}) => {
    const response = await firebase.db.collection('activities').doc(id).delete()

    console.log(response)
}