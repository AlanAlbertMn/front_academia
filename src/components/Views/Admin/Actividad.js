//login #2
import React, { useEffect, useContext, useState } from 'react';
import { Container, Grid } from '@material-ui/core';

import { useLoginStyles } from './Login.styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppContext from '../Context/AppContext';
import { SplashScreenContainer } from './LoginComponents/SplashScreenContainer';
import { ActividadContainer } from './ActividadContainer';
import { SesionContainer } from './SesionContainer';
import { RelacionContainer } from './RelacionContainer';
import useFormReducer from '../../utils/useFormReducer';
import { validations, signUpValidations, otpValidations } from './Login.utils';
import BasicAlert from '../BasicComponents/BasicAlert';
import { utils } from '../../utils';

const Actividad = ({ history }) => {
	// clears local storage when login render

	useEffect(() => {
		localStorage.clear();
	}, []);
	// Handles alert
	const [alert, handleAlert] = useState({
		open: false,
		text: '',
	});

	// Use custom theme
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));
	const appProvider = useContext(AppContext);
	const classes = useLoginStyles();

	// Reducer used to handle the elements to display in login
	const [views, dispatchViews] = useState({
		login: false,
		splashScreen: true,
		signUp: false,
		otpScreen: false,
		activity: true,
		session: false,
	});

	// In case login request is performed with no errors
	const handleSuccess = (data) => {
		resetForm();
		if (data.signIn.user) {
			const userRoutes = utils.getUserRoutes(data.signIn.user.role);
			localStorage.setItem('token', data.signIn.token.token);
			localStorage.setItem('xcoins-user', JSON.stringify(data.signIn.user));
			appProvider.setUser(data.signIn.user);
			appProvider.setRoutes(userRoutes);
			history.replace('/home');
		}
	};

	const handleError = (error) => {
		handleAlert({
			open: true,
			text: error.message,
			severity: 'error',
		});
	};

	// Uses react custom hook to handle form state
	const [
		form,
		_dispatchForm,
		{ updateForm, validateForm, resetForm },
	] = useFormReducer({
		initialState: [
			{
				login: {
					value: '',
					error: null,
					valid: false,
				},
				password: {
					value: '',
					error: null,
					valid: false,
				},
				activity: {
					value: '',
					error: null,
					valid: false,
				},
				session: {
					value: '',
					error: null,
					valid: false,
				},
				relation: {
					value: '',
					error: null,
					valid: false,
				},
			},
		],
		validations,
	});

	useEffect(() => {
		if (matches) {
			dispatchViews({
				activity: true,
				splashScreen: true,
				session: false,
			});
		} else {
			dispatchViews({
				activity: false,
				splashScreen: true,
				session: true,
			});
		}
	}, [matches]);

	// Validates form and performs mutation if all fields are valid
	const next = () => {
		const validForm = validateForm();
		if (validForm) {
			console.log('THE FORM IS VALID');
		}
	};

	return (
		<Container
			disableGutters={true}
			maxWidth='xl'
			className={matches ? classes.root : classes.rootSm}
		>
			<Grid
				container
				alignContent='center'
				alignItems='center'
				className={matches ? classes.container : classes.containerSm}
			>
				{views.splashScreen && (
					<SplashScreenContainer
						classes={classes}
						matches={matches}
						dispatchViews={dispatchViews}
						views={views}
					/>
				)}
				{views.activity && (
					<ActividadContainer
						next={next}
						matches={matches}
						classes={classes}
						form={form}
						updateForm={updateForm}
						views={views}
						dispatchViews={dispatchViews}
					/>
				)}
				{views.session && (
					<SesionContainer
						next={next}
						matches={matches}
						classes={classes}
						form={form}
						updateForm={updateForm}
						views={views}
						dispatchViews={dispatchViews}
					/>
				)}
				{views.relation && (
					<RelacionContainer
						next={next}
						matches={matches}
						classes={classes}
						form={form}
						updateForm={updateForm}
						views={views}
						dispatchViews={dispatchViews}
					/>
				)}
			</Grid>
			<BasicAlert
				open={alert.open}
				handleAlert={handleAlert}
				severity={alert.severity}
				text={alert.text}
			/>
		</Container>
	);
};

export default Actividad;
