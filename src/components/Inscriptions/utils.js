import {
    studentRequired
} from "../../utils/validations";

export const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    {
        id: "name",
        label: "Nombre(s)",
        minWidth: 170,
        align: "left",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "lastName",
        label: "Apellido(s)",
        empty: '-',
        minWidth: 170,
        align: "left",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "edit",
        label: "Gestionar",
        minWidth: 170,
        align: "center",
    },
];


export const content = {
    deleteButtonText: 'Eliminar',
    title: 'Inscritos',
    addButtonText: 'Agregar estudiantes',
    editButtonText: 'Editar',
    addLink: '/crear-actividad',
    updateLink: '/actualizar-actividad/',
    studentsLink: '/inscripciones/',
    module: 'incriptions'
}

export const validations = {
    student: studentRequired
}