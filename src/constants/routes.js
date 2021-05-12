import ShowActivities from '../components/Activities/ShowActivities'
const routes = [
    {
        path: '/actividades',
        component: ShowActivities,
        roles: ['ADMIN'],
        name: 'Actividades',
        shouldAppear: true
    }
	// {
	// 	path: '/home',
	// 	component: Home,
	// 	roles: ['ADMIN', 'CLIENT'],
	// 	name: 'Home',
	// 	shouldAppear: true,
	// },
];

export default routes;
