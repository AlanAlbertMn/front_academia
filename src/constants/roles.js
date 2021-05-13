export const permissionsByModule = {
    activities: {
        read: ['ADMIN', 'STUDENT', 'INSTRUCTOR'],
        create: ['ADMIN'],
        edit: ['ADMIN'],
        subscribe: ['ADMIN'],
        delete: ['ADMIN'],
        extraAction: ['ADMIN', 'INSTRUCTOR']
    },
    incriptions: {
        read: ['ADMIN', 'INSTRUCTOR'],
        create: ['ADMIN'],
        edit: ['ADMIN'],
        subscribe: ['ADMIN'],
        delete: ['ADMIN']
    },
    users: {
        read: ['ADMIN'],
        create: ['ADMIN'],
        edit: ['ADMIN'],
        subscribe: ['ADMIN'],
        delete: ['ADMIN']
    }
}

export const getPermissionsFromModule = ({module, role}) => {
    const permissions = {}
    for (const moduleKey in permissionsByModule[module]) {
        if (permissionsByModule[module][moduleKey].includes(role)) {
            permissions[moduleKey] = true
        }
    }
    return permissions
}