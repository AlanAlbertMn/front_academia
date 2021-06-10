import {costRequired, dateRequired, nameRequired} from "../../../utils/validations";


export const validations = {
    name: nameRequired,
    lastRenovation: dateRequired,
    cost: costRequired
}