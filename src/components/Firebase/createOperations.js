import {
    createActivity
} from "./Create";

import {
    createParent,
    createUser
} from "./Create";

export const addActivity = ({firebase, data}) => createActivity({firebase, data})

export const addParent = ({firebase, data}) => createParent({firebase, data})

export const addUser = ({firebase, data}) => createUser({firebase, data})