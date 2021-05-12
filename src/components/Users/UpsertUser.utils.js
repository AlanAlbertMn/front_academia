import {
    userSignUp,
    passwordSignUp,
    roleRequired,
    email,
    nameRequired,
} from "../../utils/validations";

export const validations = {
    password: passwordSignUp,
    username: userSignUp,
    email,
    name: nameRequired,
    role: roleRequired,
}

export const roleOptions = [
    {
        id: "ADMIN",
        name: "Administrator",
    },
    {
        id: "CLIENT",
        name: "Client",
    },
    {
        id: "PADRE",
        name: "Padre/Tutor",
    },
    {
        id: "ALUMNO",
        name: "Alumno",
    },
];