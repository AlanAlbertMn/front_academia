import {readActivities, readActivity, readInstructors, readStudents, readUser, readUsers, readProducts, readProduct} from "./Read";

export const getUser = ({firebase, id}) => readUser({firebase, id})

export const getActivities = ({firebase}) => readActivities({firebase})

export const getActivity = ({firebase, id}) => readActivity({firebase, id})

export const getInstructors = ({firebase}) => readInstructors({firebase})

export const getStudents = ({firebase}) => readStudents({firebase})

export const getUsers = ({firebase}) => readUsers({firebase})

export const getProducts = ({firebase}) => readProducts({firebase})

export const getProduct = ({firebase, id}) => readProduct({firebase, id})