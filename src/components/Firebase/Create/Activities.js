export const createActivity = async ({firebase, data}) => {
    const activityCreated = await firebase.db.collection('activities').add(data);

    return {
        activity: activityCreated
    }
}