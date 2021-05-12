import {
    createActivity
} from "./Create";

import {
    createParent
} from "./Create";

export const addActivity = ({firebase, data}) => createActivity({firebase, data})

export const addParent = ({firebase, data}) => createParent({firebase, data})

