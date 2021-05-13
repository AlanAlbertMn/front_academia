import {Grid, Typography} from "@material-ui/core";
import React, {useState} from "react";
import BasicAutocomplete from "../BasicComponents/BasicAutocomplete";
import BasicInput from "../BasicComponents/BasicInput";
import BasicButton from "../BasicComponents/BasicButton";
import useFormReducer from "../../utils/useFormReducer";
import BasicAlert from '../BasicComponents/BasicAlert'
import TextField from '@material-ui/core/TextField';
import BasicContainer from "../BasicComponents/BasicContainer";
import useUpsertUserStyles from "./styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import {parentValidation, instructorValidation, adminValidation,  studentValidation, resposableValidation, roleOptions} from "./utils";
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';

function UpsertUser({history, firebase}) {
    const [alert, handleAlert] = useState({
        open: false,
        text: "",
    });

    const handleSuccess = (data) => {
        // resetForm();
        // if (data) {
        //     const userRoutes = utils.getUserRoutes(data.user.role);
        //     localStorage.setItem('academia-user', JSON.stringify(data.user));
        //     appProvider.setUser(data.user);
        //     appProvider.setRoutes(userRoutes);
        //     history.replace('/actividades');
        // }
    };

    const [form, _dispatchForm, {updateForm, validateForm}] = useFormReducer({
        initialState: [
            {
                name: {
                    value: "",
                    valid: false,
                    error: null,
                },
                lastName: {
                    value: "",
                    valid: false,
                    error: null,
                },
                phone: {
                    value: "",
                    valid: false,
                    error: null,
                },
                email: {
                    value: "",
                    valid: false,
                    error: null,
                },
                taxData: {
                    value: '',
                    valid: false,
                    error: null
                },
                medicalData: {
                    value: '',
                    valid: false,
                    error: null
                },
                birthday: {
                    value: '',
                    valid: false,
                    error: null
                },
                inscriptionDate: {
                    value: '',
                    valid: false,
                    error: null
                },
                role: {
                    value: "",
                    valid: false,
                    error: null
                }
            },
        ],
    });

    const classes = useUpsertUserStyles();

    const dispatchValue = ({key, value}) => {
        updateForm({key, value, index: 0});
    };

    const handleOnCompleted = () => {
        history.replace("/users");
    };

    const handleError = (error) => {
        handleAlert({
            open: true,
            text: "The user or email are already registered",
        });
    };

    const next = async () => {
        const validForm = validateForm();
        if (validForm) {
            try {
                const user = await firebase.addUser(
                    {
                        name: form[0].name.value,
                        lastName: form[0].lastName.value,
                        email: form[0].email.value,
                        phone: form[0].phone.value,
                        genero: form[0].genero.value,
                        birthday: form[0].birthday.value,
                        calle: form[0].calle.value,
                        col: form[0].col.value,
                        municipio: form[0].municipio.value,
                        estado: form[0].estado.value,
                        codPostal: form[0].codPostal.value
                    })
                if (user) {
                    handleSuccess(user)
                }
            } catch (error) {
                handleError(error)
            }
        }
    }

    const [value, setValue] = React.useState('femenino');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <BasicContainer justify='flex-start' alignContent='flex-start'>
            <Grid item xs={12} className={classes.title}>
                <Typography variant="h3">Registrar usuario</Typography>
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicAutocomplete
                    dispatchValue={dispatchValue}
                    mapperKey="role"
                    label="Role"
                    value={form[0].role.value}
                    errorText={form[0].role.error}
                    options={roleOptions}
                />
            </Grid>

            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Nombre(s)"
                    value={form[0].name.value}
                    errorText={form[0].name.error}
                    dispatchValue={dispatchValue}
                    mapperKey="name"
                />
            </Grid>

            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Apellidos"
                    value={form[0].lastName.value}
                    errorText={form[0].lastName.error}
                    dispatchValue={dispatchValue}
                    mapperKey="lastName"
                />
            </Grid>
            {form[0].role.value === 'ALUMNO' && (
                <Grid item xs={12} className={classes.field}>
                    <FormLabel component="legend">Género</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="femenino" control={<Radio/>} label="Femenino"/>
                        <FormControlLabel value="masculino" control={<Radio/>} label="Masculino"/>
                        <FormControlLabel value="otro" control={<Radio/>} label="Otro"/>
                    </RadioGroup>
                </Grid>
            )}
            {form[0].role.value !== 'PARENT' && (
                <Grid item xs={12} className={classes.field}>
                    <BasicInput
                        label="Telefono"
                        value={form[0].phone.value}
                        errorText={form[0].phone.error}
                        dispatchValue={dispatchValue}
                        mapperKey="phone"
                    />
                </Grid>
            )}
            {form[0].role.value !== 'ALUMNO' && (
                <Grid item xs={12} className={classes.field}>
                    <BasicInput
                        label="Email"
                        value={form[0].email.value}
                        errorText={form[0].email.error}
                        dispatchValue={dispatchValue}
                        mapperKey="email"
                    />
                </Grid>
            )}
            {(form[0].role.value === 'ALUMNO' || form[0].role.value === 'INSTRUCTOR') && (
                <Grid item xs={12} className={classes.field}>
                    <BasicInput
                        id="date"
                        value={form[0].birthday.value}
                        dispatchValue={dispatchValue}
                        label="Fecha de nacimiento"
                        type="date"
                        errorText={form[0].birthday.error}
                    />
                </Grid>
            )}
            {form[0].role.value === 'PADRE' && (
                <Grid item xs={12} className={classes.field}>
                    <BasicInput
                        label="Datos fiscales"
                        value={form[0].taxData.value}
                        errorText={form[0].taxData.error}
                        dispatchValue={dispatchValue}
                        mapperKey="taxData"
                    />
                </Grid>
            )}
            {(form[0].role.value === 'ALUMNO' || form[0].role.value === 'PADRE') && (
                <Grid item xs={12} className={classes.field}>
                    <BasicInput
                        label="Direccion"
                        value={form[0].address.value}
                        errorText={form[0].address.error}
                        dispatchValue={dispatchValue}
                        mapperKey="address"
                    />
                </Grid>
            )}
            {form[0].role.value === 'ALUMNO' && (
                <Grid item xs={12} className={classes.field}>
                    {/* //direccion */}
                    <BasicInput
                        label="Datos médicos"
                        value={form[0].medicalData.value}
                        errorText={form[0].medicalData.error}
                        dispatchValue={dispatchValue}
                        mapperKey="medicalData"
                    />
                </Grid>
            )}
            <Grid item xs={12} container justify="center" className={classes.title}>
                <BasicButton handleClick={next} fullWidth color="primary">
                    Registrar persona
                </BasicButton>
            </Grid>
            <BasicAlert
                open={alert.open}
                handleAlert={handleAlert}
                severity="error"
                text={alert.text}
            />
        </BasicContainer>
    );
}

export default compose(
    withRouter,
    withFirebase,
)(UpsertUser);