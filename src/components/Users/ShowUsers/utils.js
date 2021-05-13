export const columns = [
    {id: "id", label: "ID", minWidth: 170},
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
        id: 'role',
        label: 'Rol',
        empty: '-',
        minWidth: 170,
        align: 'left',
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
    title: 'Usuarios',
    addButtonText: 'Agregar usuarios',
    editButtonText: 'Editar',
    addLink: '/crear-usuario',
    updateLink: '/actualizar-usuario/',
    module: 'users'
}