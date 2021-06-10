export const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    {
        id: "student",
        label: "Estudiante",
        align: "left",
    },
    {
        id: "product",
        label: "Producto",
        align: "left",
    },
    {
        id: "date",
        label: "Fecha",
        align: "left",
    },
    {
        id: "quantity",
        label: "Cantidad",
        align: "left"
    },
    {
        id: "total",
        label: 'Total',
        minWidth: 170,
        align: "left",
        format: (value) => value.toLocaleString()
    },
];

export const content = {
    deleteButtonText: 'Eliminar',
    title: 'Ventas',
    addButtonText: 'Registrar venta',
    addLink: '/registrar-venta',
    module: 'sales'
}