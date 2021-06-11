export const readUser = async ({firebase, id}) => {

    const usersSnapshot = await firebase.db.collection('users').doc(id).get();

    if (usersSnapshot.empty) {
        throw new Error('El usuario buscado no se encuentra registrado')
    }

    return {...usersSnapshot.data(), id: usersSnapshot.id}

}


export const readUserWithEmail = async ({firebase, email}) => {
    const usersSnapshot = await firebase.db.collection('users').where('email', '==', email).get();

    if (usersSnapshot.empty) {
        throw new Error('El usuario buscado no se encuentra registrado')
    }

    return {...usersSnapshot.docs[0].data(), id: usersSnapshot.docs[0].id}

}

export const readUsers = async({firebase}) => {
    const usersSnapshot = await firebase.db.collection('users').get();

    const users = []

    if (usersSnapshot.empty) {
        return []
    } else {
        usersSnapshot.forEach(doc => users.push({...doc.data(), id: doc.id}))
    }

    return users
}

export const readInstructors = async ({firebase}) => {
    const instructorsSnapshot = await firebase.db.collection('users').where('role', '==', 'INSTRUCTOR').get()

    const instructors = []

    if (instructorsSnapshot.empty) {
        return []
    } else {
        instructorsSnapshot.forEach(doc => instructors.push({...doc.data(), id: doc.id}))
    }

    return instructors
}

export const readStudents = async ({firebase}) => {
    const studentsSnapshot = await firebase.db.collection('users').where('role', '==', 'STUDENT').get()

    const students = []

    if (studentsSnapshot.empty) {
        return []
    } else {
        studentsSnapshot.forEach(doc => students.push({...doc.data(), id: doc.id}))
    }

    return students
}