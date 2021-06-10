import {productRequired, quantityRequired, studentRequired} from "../../../utils/validations";

export const validations = {
    product: productRequired,
    quantity: quantityRequired,
    student: studentRequired,
}

export const renovationUnits = [
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