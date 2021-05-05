//login #2
import React, { useEffect, useContext, useState } from 'react';
import { Container, Grid } from '@material-ui/core';

import { useLoginStyles } from './Login.styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppContext from '../Context/AppContext';
import { SplashScreenContainer } from './LoginComponents/SplashScreenContainer';
import { LoginContainer } from './LoginComponents/LoginContainer';
import useFormReducer from '../../utils/useFormReducer';
import { validations, signUpValidations, otpValidations } from './Login.utils';
import BasicAlert from '../BasicComponents/BasicAlert';
import { utils } from '../../utils';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
  };
  
const Login = ({ history }) => {
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
		login: true,
		splashScreen: true,
		signUp: false,
		otpScreen: false,
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
			},
		],
		validations,
	});

	useEffect(() => {
		if (matches) {
			dispatchViews({
				login: true,
				splashScreen: true,
				signUp: false,
			});
		} else {
			dispatchViews({
				login: false,
				splashScreen: true,
				signUp: false,
			});
		}
	}, [matches]);

	// Validates form and performs mutation if all fields are valid
	// const next = () => {
	// 	const validForm = validateForm();
	// 	if (validForm) {
	// 		console.log('THE FORM IS VALID');
	// 		console.log(form[0].login.value);
	// 	}
	// };

	const next = () => {
		const validForm = validateForm();
		if (validForm) {
			console.log('THE FORM IS VALID');
			this.props.firebase
			.doSignInWithEmailAndPassword(form[0].login.value, form[0].login.password)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				history.replace('/home');
			})
			.catch(error => {
				this.setState({ error });
			});
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
				{views.login && (
					<LoginContainer
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

const SignInForm = compose(
	withRouter,
	withFirebase,
  )(Login);
 
export default Login;
//