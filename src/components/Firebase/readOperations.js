import {
    createParent
} from './Create'

import {
    readActivities, readActivity,
    readUser
} from "./Read";

export const getUser = ({firebase, email}) => readUser({firebase, email})

export const getActivities = ({firebase}) => readActivities({firebase})

export const getActivity = async ({firebase, id}) => await readActivity({firebase, id})