import ShowActivities from '../components/Activities/ShowActivities'
import UpsertActivity from '../components/Activities/UpsertActivities'
import ShowInscriptions from '../components/Inscriptions'
import ShowUsers, {UpsertUser} from '../components/Users'

const routes = [
    {
        path: '/actividades',
        component: ShowActivities,
        roles: ['ADMIN'],
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
        roles: ['ADMIN'],
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
    }
];

export default routes;
