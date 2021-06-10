export const columns = [
    { id: "id", label: "ID"},
    {
        id: "name",
        label: "Producto",
        align: "left",
        format: (value) => value.toLocaleString(),
    },
    {
        id: "renovationSpan",
        label: "Periodo de renovación",
        align: "left",
    },
    {
        id: "renovationUnit",
        label: 'Unidad del periodo',
        align: "left",
        format: (value) => value.toLocaleString()
    },
    {
        id: "lastRenovation",
        label: 'Última renovación',
        align: "left",
        format: (value) => value.toLocaleString()
    },
    {
        id: "cost",
        label: "Costo",
        align: "left"
    },
    {
        id: "nextRenovation",
        label: "Próxima renovación",
        align: "left"
    },
    {
        id: "edit",
        label: "Gestionar",
        align: "center",
    },
];

export const content = {
    deleteButtonText: 'Eliminar',
    title: 'Productos',
    addButtonText: 'Agregar producto',
    editButtonText: 'Editar',
    addLink: '/crear-producto',
    updateLink: '/actualizar-producto/',
    module: 'products'
}