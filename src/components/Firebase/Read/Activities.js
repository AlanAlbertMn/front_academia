export const readActivities = async ({firebase}) => {
    const activitiesSnapshot = await firebase.db.collection('activities').get();

    let formattedActivities = []

    if (activitiesSnapshot.empty) {
        return []
    } else {
        activitiesSnapshot.forEach(doc => formattedActivities.push({...doc.data(), id: doc.id}))
        return formattedActivities
    }
}

export const readActivitiesFromStudent = async ({firebase, id}) => {
    const activitiesSnapshot = await firebase.db.collection('activities').where('inscribed', 'array-contains', id).get();

    let formattedActivities = []

    if (activitiesSnapshot.empty) {
        return []
    } else {
        activitiesSnapshot.forEach(doc => formattedActivities.push({...doc.data(), id: doc.id}))
        return formattedActivities
    }
}

export const readActivitiesFromInstructor = async({firebase, id}) => {
    console.log('EL ID ENVIADO ES', id)
    const activitiesSnapshot = await firebase.db.collection('activities').where('instructors', 'array-contains', id).get();

    let formattedActivities = []

    if (activitiesSnapshot.empty) {
        return []
    } else {
        activitiesSnapshot.forEach(doc => formattedActivities.push({...doc.data(), id: doc.id}))
        return formattedActivities
    }
}


export const readActivity = async ({firebase, id}) => {
    const activitiesSnapshot = await firebase.db.collection('activities').doc(id).get();


    if (activitiesSnapshot.empty) {
        throw new Error('La actividad solicitada no fue encontrada')
    }

    return {...activitiesSnapshot.data(), id: activitiesSnapshot.id}
}
