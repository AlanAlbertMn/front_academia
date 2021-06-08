export const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    {
        id: "name",
        label: "Nombre del producto",
        minWidth: 170,
        align: "left",
        format: (value) => value.toLocaleString("en-US")
    },
    {
        id: "cost",
        label: 'Costo',
        minWidth: 170,
        align: "left",
        format: (value) => value.toLocaleString("en-US")
    },
    {
        id: "period",
        label: "Periodicidad",
        minWidth: 170,
        align: "left",
        format: (value) => value.toLocaleString("en-US")
    },
    {
        id: "type",
        label: "Tipo",
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
    addLink: '/crear-producto',
    updateLink: '/actualizar-producto/',
    studentsLink: '/inscripciones/',
    extraActionText: 'Gestionar inscritos',
    module: 'products'
}