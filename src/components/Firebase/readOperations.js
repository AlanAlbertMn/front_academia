import {readActivities, readActivity, readInstructors, readStudents, readUser, readUsers} from "./Read";

export const getUser = ({firebase, email}) => readUser({firebase, email})

export const getActivities = ({firebase}) => readActivities({firebase})

export const getActivity = ({firebase, id}) => readActivity({firebase, id})

export const getInstructors = ({firebase}) => readInstructors({firebase})

export const getStudents = ({firebase}) => readStudents({firebase})

export const getUsers = ({firebase}) => readUsers({firebase})