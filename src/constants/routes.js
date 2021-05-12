import ShowActivities from '../components/Activities/ShowActivities'
import UpsertUser from '../components/Users/UpsertUser';
const routes = [
    {
        path: '/actividades',
        component: ShowActivities,
        roles: ['ADMIN'],
        name: 'Actividades',
        shouldAppear: true
    },
	{
		path: '/registrarUsuario',
		component: UpsertUser,
		roles: ['ADMIN'],
		name: 'UpsertUser',
		shouldAppear: true,
	},
];

export default routes;
