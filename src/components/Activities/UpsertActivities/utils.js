import {
    nameRequired,
    scheduleRequired,
    hoursPerWeekRequired,
    instructorsRequired,
    costRequired
} from "../../../utils/validations";


export const validations = {
    name: nameRequired,
    schedule: scheduleRequired,
    hoursPerWeek: hoursPerWeekRequired,
    instructors: instructorsRequired,
    costPerHour: costRequired
}