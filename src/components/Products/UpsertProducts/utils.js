import {
    nameRequired,
    costRequired,
    periodRequired,
    typeRequired
} from "../../../utils/validations";


export const validations = {
    name: nameRequired,
    cost: costRequired,
    period: periodRequired,
    type: typeRequired
}