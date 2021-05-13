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

const studentTemplate = ['name', 'lastName', 'birthday', 'address', 'inscriptionDate', 'medicalData', 'role', 'email']

const parentTemplate = ['name', 'lastName', 'phone', 'email', 'taxData', 'role']

const responsableTemplate = ['name', 'lastName', 'phone', 'email', 'role']

const instructorTemplate = ['name', 'lastName', 'phone', 'email', 'birthday', 'role']

const adminTemplate = ['name', 'lastName', 'phone', 'email', 'role'];

const templateChooser = {
    ADMIN: adminTemplate,
    INSTRUCTOR: instructorTemplate,
    STUDENT: studentTemplate,
    PARENT: parentTemplate,
    RESPONSABLE: responsableTemplate
}

const validationChooser = {
    ADMIN: adminValidation,
    INSTRUCTOR: instructorValidation,
    STUDENT: studentValidation,
    PARENT: parentValidation,
    RESPONSABLE: resposableValidation
}

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
                address: {
                    value:'',
                    valid: false,
                    error: null
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
        validations: {}
    });

    const classes = useUpsertUserStyles();

    const dispatchValue = ({key, value}) => {
        updateForm({key, value, index: 0});
    };

    const handleOnCompleted = () => {
        history.replace("/usuarios");
    };

    const handleError = (error) => {
        handleAlert({
            open: true,
            text: "The user or email are already registered",
        });
    };

    const next = async () => {
        if (form[0].role.value) {
            const validations = validationChooser[form[0].role.value]

            const valid = validateForm(validations)

            console.log(valid)

            if (valid) {
                const userData = {}
                const template = templateChooser[form[0].role.value]

                for (let i = 0; i < template.length; i++) {
                    const currentKey = template[i];
                    console.log(currentKey)
                    userData[currentKey] = form[0][currentKey].value
                    console.log(form[0][currentKey].value)
                }

                console.log(userData)
                try {
                    firebase.upsertUser({data: {...userData, password: '123456'}}).then(res => handleOnCompleted())
                } catch(error) {
                    console.log(error)
                }
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
                    label="Rol"
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
            {form[0].role.value === 'STUDENT' && (
                <Grid item xs={12} className={classes.field}>
                    <FormLabel component="legend">Género</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="femenino" control={<Radio/>} label="Femenino"/>
                        <FormControlLabel value="masculino" control={<Radio/>} label="Masculino"/>
                        <FormControlLabel value="otro" control={<Radio/>} label="Otro"/>
                    </RadioGroup>
                </Grid>
            )}
            {form[0].role.value !== 'STUDENT' && (
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
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Email"
                    value={form[0].email.value}
                    errorText={form[0].email.error}
                    dispatchValue={dispatchValue}
                    mapperKey="email"
                />
            </Grid>
            {(form[0].role.value === 'STUDENT' || form[0].role.value === 'INSTRUCTOR') && (
                <Grid item xs={12} className={classes.field}>
                    <Typography>Fecha de nacimiento</Typography>
                    <BasicInput
                        id="date"
                        value={form[0].birthday.value}
                        dispatchValue={dispatchValue}
                        type="date"
                        errorText={form[0].birthday.error}
                        mapperKey={'birthday'}
                    />
                </Grid>
            )}
            {(form[0].role.value === 'STUDENT') && (

                <Grid item xs={12} className={classes.field}>
                    <Typography>Fecha de inscripción</Typography>
                    <BasicInput
                        id="date"
                        value={form[0].inscriptionDate.value}
                        dispatchValue={dispatchValue}
                        type="date"
                        errorText={form[0].inscriptionDate.error}
                        mapperKey={'inscriptionDate'}
                    />
                </Grid>
            )}
            {form[0].role.value === 'PARENT' && (
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
            {(form[0].role.value === 'STUDENT' || form[0].role.value === 'PARENT') && (
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
            {form[0].role.value === 'STUDENT' && (
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