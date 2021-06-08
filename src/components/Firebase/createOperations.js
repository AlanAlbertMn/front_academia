import {
    createActivity
} from "./Create";

import {
    createParent
} from "./Create";

import {
    createProduct
} from "./Create";

export const addActivity = ({firebase, data}) => createActivity({firebase, data})

export const addParent = ({firebase, data}) => createParent({firebase, data})

export const addProduct = ({firebase, data}) => createProduct({firebase, data})

