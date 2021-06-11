export const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    {
        id: "name",
        label: "Nombre",
        minWidth: 170,
        align: "left",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "schedule",
        label: "Horario",
        minWidth: 170,
        align: "left",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "hoursPerWeek",
        label: "Horas por semana",
        minWidth: 170,
        align: "left",
    },
    {
        id: "instructors",
        label: 'Instructores',
        minWidth: 170,
        align: "left",
        format: (value) => value.toLocaleString("en-US")
    },
    {
        id: "costPerHour",
        label: 'Pago por hora',
        minWidth: 170,
        align: "left",
        format: (value) => value.toLocaleString("en-US")
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
    title: 'Actividades',
    addButtonText: 'Agregar actividades',
    editButtonText: 'Editar',
    addLink: '/crear-actividad',
    updateLink: '/actualizar-actividad/',
    studentsLink: '/inscripciones/',
    extraActionText: 'Gestionar inscritos',
    secondaryActionText: 'Enviar correo',
    secondaryActionLink: '/correo/',
    module: 'activities'
}