import {
    deleteActivity,
    deleteProduct,
    deleteSale
} from "./Delete";

export const removeActivity = ({firebase, id}) => deleteActivity({firebase, id})

export const removeProduct = ({firebase, id}) => deleteProduct({firebase, id})

export const removeSale = ({firebase, id}) => deleteSale({firebase, id})