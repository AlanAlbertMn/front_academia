import {
    deleteActivity
} from "./Delete";

import {
    deleteProduct
} from "./Delete";

export const removeActivity = ({firebase, id}) => deleteActivity({firebase, id})

export const removeProduct = ({firebase, id}) => deleteProduct({firebase, id})