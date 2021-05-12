import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid} from '@material-ui/core';

import {useLoginStyles} from './Login.styles';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppContext from '../Context/AppContext';
import {SplashScreenContainer} from './LoginComponents/SplashScreenContainer';
import {LoginContainer} from './LoginComponents/LoginContainer';
import useFormReducer from '../../utils/useFormReducer';
import {signUpValidations, validations} from './Login.utils';
import BasicAlert from '../BasicComponents/BasicAlert';
import {utils} from '../../utils';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import {SignUpContainer} from "./LoginComponents/SignUpContainer";
import ShowActivitiesContainer from './ShowActivities/ShowActivitiesContainer';

const Activities = ({history, firebase}) => {
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
        if (data) {
            const userRoutes = utils.getUserRoutes(data.user.role);
            localStorage.setItem('academia-user', JSON.stringify(data.user));
            appProvider.setUser(data.user);
            appProvider.setRoutes(userRoutes);
            history.replace('/actividades');
        }
    };

    const handleError = (error) => {
        handleAlert({
            open: true,
            text: error.message,
            severity: 'error',
        });
    };

    const handleSuccessfulSignUp = () => {
        resetSignUpForm()
        dispatchViews(prevState => ({...prevState, login: true, signUp: false}))
        handleAlert({
            open: true,
            text: 'Se han registrado tus datos, espera hasta que estés autorizado por la administración para ingresar',
            severity: 'success'
        })
    }

    // Uses react custom hook to handle form state
    const [
        form,,
        {updateForm, validateForm, resetForm},
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
        validations
    });

    const [
        signUpForm,,
        {updateForm: updateSignUpForm, validateForm: validateSignUpForm, resetForm: resetSignUpForm}
    ] = useFormReducer({
        initialState: [
            {
                nombre: {
                    value: '',
                    error: null,
                    valid: null
                },
                apellidos: {
                    value: '',
                    error: null,
                    valid: null
                },
                email: {
                    value: '',
                    error: null,
                    valid: null
                },
                telefono: {
                    value: '',
                    error: null,
                    valid: null
                },
                password: {
                    value: '',
                    error: null,
                    valid: null
                }

            }
        ],
        validations: signUpValidations
    })


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

    const next = async () => {
        const validForm = validateForm();
        if (validForm) {
            try {
                const user = await firebase.login({email: form[0].login.value, password: form[0].password.value})
                if (user) {
                    handleSuccess(user)
                }
            } catch (error) {
                handleError(error)
            }
        }
    }

    const nextForSignUp = async () => {
        const validForm = validateSignUpForm()
        if (validForm) {
            try {
                await firebase.signUp({
                    data: {
                        email: signUpForm[0].email.value,
                        password: signUpForm[0].password.value
                    }
                })
                handleSuccessfulSignUp()
            } catch (error) {
                handleError(error)
            }
        }
    }

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
                    <ShowActivitiesContainer
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
}

const ActivitiesForm = compose(
    withRouter,
    withFirebase,
)(Activities);

export default ActivitiesForm;