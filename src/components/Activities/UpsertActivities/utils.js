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

export const renovationUnits = [
    {
        id: 'DAILY',
        name: 'Diario'
    },
    {
        id: 'WEEKLY',
        name: 'Semanalmente'
    },
    {
        id: 'MONTHLY',
        name: 'Mensual'
    },

    {
        id: 'YEARLY',
        name: 'Anual'
    }
]