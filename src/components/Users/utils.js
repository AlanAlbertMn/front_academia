import {
    nameRequired,
    taxDataRequired,
    birthdayRequired,
    lastNameRequired,
    genderRequired,
    inscriptionDateRequired,
    addressRequired,
    medicalDataRequired,
    phoneRequired,
    roleRequired,
    email

} from "../../utils/validations";


export const studentValidation = {
    name: nameRequired,
    lastName: lastNameRequired,
    birthday: birthdayRequired,
    medicalData: medicalDataRequired,
    address: addressRequired,
    role: roleRequired,
    email       ,
    inscriptionDate: inscriptionDateRequired
}


export const parentValidation = {
    name: nameRequired,
    lastName: lastNameRequired,
    email,
    phone: phoneRequired,
    taxData: taxDataRequired,
    role: roleRequired
}

export const resposableValidation = {
    name: nameRequired,
    lastName: lastNameRequired,
    email,
    phone: phoneRequired,
    role: roleRequired
}

export const instructorValidation = {
    name: nameRequired,
    lastName: lastNameRequired,
    email,
    phone: phoneRequired,
    role: roleRequired,
    birthday: birthdayRequired,
}

export const adminValidation = {
    name: nameRequired,
    lastName: lastNameRequired,
    email,
    phone: phoneRequired,
    role: roleRequired
}

export const roleOptions = [
    {
        id: 'ADMIN',
        name: 'Administrador'
    },
    {
        id: 'STUDENT',
        name: 'Estudiante'
    },
    {
        id: 'PARENT',
        name: 'Padre'
    },
    {
        id: 'INSTRUCTOR',
        name: 'Instructor'
    },
    {
        id: 'RESPONSABLE',
        name: 'Responsable'
    }
]
