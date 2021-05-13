import ShowActivities from '../components/Activities/ShowActivities'
import UpsertActivity from '../components/Activities/UpsertActivities'
import ShowInscriptions from '../components/Inscriptions'

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
    }
];

export default routes;
