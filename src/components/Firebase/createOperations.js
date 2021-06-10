import {
    createActivity
} from "./Create";

import {
    createParent,
    createSale
} from "./Create";


export const addActivity = ({firebase, data}) => createActivity({firebase, data})

export const addParent = ({firebase, data}) => createParent({firebase, data})

export const addSale = ({firebase, data}) => createSale({firebase, data})

