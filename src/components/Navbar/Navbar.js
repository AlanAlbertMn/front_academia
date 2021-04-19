import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import BasicButton from '../BasicComponents/BasicButton';
import { Switch, Route } from 'react-router-dom';
import { utils } from '../../utils';
import AppContext from '../Context/AppContext';
import Login from '../Login/Login';
import BasicAlert from '../BasicComponents/BasicAlert';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: '0px 8px 0px 8px',
	},
	dialog: {
		paper: {
			backgroundColor: '#393e46',
		},
	},
	noticeRow: {
		marginBottom: 16,
	},
}));
// Handles all client routes
const Navbar = ({ history, _providerInstance }) => {
	const classes = useStyles();
	const appProvider = useContext(AppContext);
	const [alert, handleAlert] = useState({
		open: false,
		text: '',
	});

	// Deletes localstorage and resets the appProvider
	const handleLogout = () => {
		appProvider.setUser({});
		appProvider.setRoutes([]);
		localStorage.clear();
		history.replace('/');
	};

	const [currentRoute, setCurrentRoute] = useState('/home');

	// Set the route based on button clicked
	const handleRouteChange = (newRoute) => {
		setCurrentRoute((prevRoute) => {
			history.replace(newRoute);
			return newRoute;
		});
	};

	// Gets current user routes based on it's role
	const userRoutes = utils.getUserRoutes(appProvider.user.role);

	// Filter routes that should not appear on the navbar
	const buttonRoutes = userRoutes.filter((route) => route.shouldAppear);

	return (
		<>
			{appProvider.user.role && (
				<AppBar position='fixed' color='secondary'>
					<Toolbar variant='dense'>
						{buttonRoutes.map((route, index) => (
							<BasicButton
								key={index}
								className={classes.button}
								disableElevation={true}
								handleClick={() => handleRouteChange(route.path)}
								color={currentRoute === route.path ? 'primary' : 'secondary'}
							>
								{route.name}
							</BasicButton>
						))}
						<BasicButton
							color='secondary'
							className={classes.button}
							handleClick={handleLogout}
						>
							Cerrar sesión
						</BasicButton>
					</Toolbar>
				</AppBar>
			)}
			<Switch>
				{userRoutes.map((route, index) => (
					<Route key={index} path={route.path} component={route.component} />
				))}
				<Route path='/' component={Login} />
			</Switch>
			<BasicAlert
				open={alert.open}
				handleAlert={handleAlert}
				text={alert.text}
				severity={alert.severity}
			/>
		</>
	);
};

export default withRouter(Navbar);
