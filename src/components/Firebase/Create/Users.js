export const createParent = async ({ firebase, data }) => {
    const newParent = await firebase.db.collection('users').add({
        ...data,
        role: 'PARENT',
        userValidated: false
    });

    return {
        parent: newParent
    }
}

export const createUser = async ({firebase, data}) => {
    return await firebase.db.collection('users').add({...data})
}