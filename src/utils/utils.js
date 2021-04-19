import routes from '../constants/routes';

export const getUserRoutes = (role) => {
	if (role) return routes.filter((route) => route.roles.includes(role));
	else return [];
};
