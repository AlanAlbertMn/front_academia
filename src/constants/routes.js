import ShowActivities from '../components/Activities/ShowActivities'
import UpsertActivity from '../components/Activities/UpsertActivities'
import ShowInscriptions from '../components/Inscriptions'
import ShowUsers, {UpsertUser} from '../components/Users'
import ShowProducts from '../components/Products/ShowProducts'
import UpsertProduct from "../components/Products/UpsertProducts";
import UpsertSale from "../components/Sales/UpsertSales";
import ShowSales from "../components/Sales/ShowSales";

const routes = [
    {
        path: '/actividades',
        component: ShowActivities,
        roles: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
        name: 'Actividades',
        shouldAppear: true
    },
    {
        path: '/actualizar-actividad/:activity',
        component: UpsertActivity,
        roles: ['ADMIN'],
        name: 'Gestionar actividad',
        shouldAppear: false
    },
    {
        path: '/crear-actividad',
        component: UpsertActivity,
        roles: ['ADMIN'],
        name: 'Gestionar actividad',
        shouldAppear: false
    },
    {
        path: '/inscripciones/:activity',
        component:ShowInscriptions,
        roles: ['ADMIN', 'INSTRUCTOR'],
        name: 'Inscripciones',
        shouldAppear: false
    },
    {
        path: '/actualizar-usuario/:user',
        component: UpsertUser,
        roles: ['ADMIN'],
        name: 'Actualizar usuario',
        shouldAppear: false
    },
    {
        path: '/crear-usuario',
        component: UpsertUser,
        roles: ['ADMIN'],
        name: 'Crear usuario',
        shouldAppear: false
    },
    {
        path: '/usuarios',
        component: ShowUsers,
        roles: ['ADMIN'],
        name: 'Usuarios',
        shouldAppear: true
    },
    {
        path: '/productos',
        component: ShowProducts,
        roles: ['ADMIN', 'RECEPTIONIST'],
        name: 'Productos',
        shouldAppear: true
    },
    {
        path: '/actualizar-producto/:product',
        component: UpsertProduct,
        roles: ['ADMIN'],
        name: 'Actualizar producto',
        shouldAppear: false
    },
    {
        path: '/crear-producto',
        component: UpsertProduct,
        roles: ['ADMIN'],
        name: 'Crear producto',
        shouldAppear: false
    },
    {
        path: '/ventas',
        component: ShowSales,
        roles: ['ADMIN'],
        name: 'Ventas',
        shouldAppear: true
    },
    {
        path: '/registrar-venta',
        component: UpsertSale,
        roles: ['ADMIN'],
        name: 'Registrar venta',
        shouldAppear: false
    }
];

export default routes;
