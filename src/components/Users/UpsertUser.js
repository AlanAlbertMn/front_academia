import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import BasicAutocomplete from "../BasicComponents/BasicAutocomplete";
import BasicInput from "../BasicComponents/BasicInput";
import BasicButton from "../BasicComponents/BasicButton";
import useFormReducer from "../../utils/useFormReducer";
import BasicAlert from '../BasicComponents/BasicAlert'
import TextField from '@material-ui/core/TextField';
import BasicContainer from "../BasicComponents/BasicContainer";
import { useUpsertUserStyles } from "./UpsertUser.styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { validations, roleOptions } from "./UpsertUser.utils";

export default function UpsertUser({ history }) {
    const [alert, handleAlert] = useState({
        open: false,
        text: "",
    });
    const [form, _dispatchForm, { updateForm, validateForm }] = useFormReducer({
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
                telefono: {
                    value: "",
                    valid: false,
                    error: null,
                },
                email: {
                    value: "",
                    valid: false,
                    error: null,
                },
                calle: {
                    value: "",
                    valid: false,
                    error: null,
                },
                numExt: {
                    value: "",
                    valid: false,
                    error: null,
                },
                numInt: {
                    value: "",
                    valid: false,
                    error: null,
                },
                col: {
                    value: "",
                    valid: false,
                    error: null,
                },
                codPostal: {
                    value: "",
                    valid: false,
                    error: null,
                },
                municipio: {
                    value: "",
                    valid: false,
                    error: null,
                },
                estado: {
                    value: "",
                    valid: false,
                    error: null,
                },
                alergia: {
                    value: "",
                    valid: false,
                    error: null,
                },
                limitsFisicas: {
                    value: "",
                    valid: false,
                    error: null,
                },
                enferm: {
                    value: "",
                    valid: false,
                    error: null,
                },
                tratMed: {
                    value: "",
                    valid: false,
                    error: null,
                },
                medicamentos: {
                    value: "",
                    valid: false,
                    error: null,
                },
                contactoEmergencia: {
                    value: "",
                    valid: false,
                    error: null,
                },
                personasAutorizadas: {
                    value: "",
                    valid: false,
                    error: null,
                },
                role: {
                    value: "ALUMNO",
                    valid: true,
                    error: null,
                },
                password: {
                    value: "",
                    valid: false,
                    error: null,
                },
            },
        ],
        validations,
    });

    const classes = useUpsertUserStyles();

    const dispatchValue = ({ key, value }) => {
        updateForm({ key, value, index: 0 });
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

    const next = () => {
        const valid = validateForm();
        if (valid) {
            //   executeMutation({
            //     variables: {
            //       input: {
            //         role: form[0].role.value,
            //         username: form[0].username.value,
            //         password: form[0].password.value,
            //         name: form[0].name.value,
            //         email: form[0].email.value,
            //       },
            //     },
            //   });
        }
    };

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
            <Grid item xs={12} className={classes.field}>
                <FormLabel component="legend">Género</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="femenino" control={<Radio />} label="Femenino" />
                    <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                    <FormControlLabel value="otro" control={<Radio />} label="Otro" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Telefono"
                    value={form[0].telefono.value}
                    errorText={form[0].telefono.error}
                    dispatchValue={dispatchValue}
                    mapperKey="telefono"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Email"
                    value={form[0].email.value}
                    errorText={form[0].email.error}
                    dispatchValue={dispatchValue}
                    mapperKey="email"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <TextField
                    id="date"
                    label="Fecha de nacimiento"
                    type="date"
                    defaultValue="2001-05-15"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                {/* //direccion */}
            Dirección
                <BasicInput
                    label="Calle"
                    value={form[0].calle.value}
                    errorText={form[0].calle.error}
                    dispatchValue={dispatchValue}
                    mapperKey="calle"
                />
                <BasicInput
                    label="Número exterior"
                    value={form[0].numExt.value}
                    errorText={form[0].numExt.error}
                    dispatchValue={dispatchValue}
                    mapperKey="numExt"
                />
                <BasicInput
                    label="Número interior"
                    value={form[0].numInt.value}
                    errorText={form[0].numInt.error}
                    dispatchValue={dispatchValue}
                    mapperKey="numInt"
                />
                <BasicInput
                    label="Colonia"
                    value={form[0].col.value}
                    errorText={form[0].col.error}
                    dispatchValue={dispatchValue}
                    mapperKey="col"
                />
                <BasicInput
                    label="Código postal"
                    value={form[0].codPostal.value}
                    errorText={form[0].codPostal.error}
                    dispatchValue={dispatchValue}
                    mapperKey="codPostal"
                />
                <BasicInput
                    label="Municipio"
                    value={form[0].municipio.value}
                    errorText={form[0].municipio.error}
                    dispatchValue={dispatchValue}
                    mapperKey="municipio"
                />
                <BasicInput
                    label="Estado"
                    value={form[0].estado.value}
                    errorText={form[0].estado.error}
                    dispatchValue={dispatchValue}
                    mapperKey="estado"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                {/* //direccion */}
            Datos médicos
            <FormLabel component="legend">Grupo sanguíneo</FormLabel>
                <RadioGroup aria-label="blood" name="blood" value={value} onChange={handleChange}>
                    <FormControlLabel value="oNegativo" control={<Radio />} label="O negativo" />
                    <FormControlLabel value="oPositivo" control={<Radio />} label="O positivo" />
                    <FormControlLabel value="aNegativo" control={<Radio />} label="A negativo" />
                    <FormControlLabel value="aPositivo" control={<Radio />} label="A positivo" />
                    <FormControlLabel value="bNegativo" control={<Radio />} label="B negativo" />
                    <FormControlLabel value="bPositivo" control={<Radio />} label="B positivo" />
                    <FormControlLabel value="abNegativo" control={<Radio />} label="AB negativo" />
                    <FormControlLabel value="abPositivo" control={<Radio />} label="AB positivo" />
                </RadioGroup>
                <BasicInput
                    label="Alergias"
                    value={form[0].alergia.value}
                    errorText={form[0].alergia.error}
                    dispatchValue={dispatchValue}
                    mapperKey="alergia"
                />
                <BasicInput
                    label="Limitaciones físicas"
                    value={form[0].limitsFisicas.value}
                    errorText={form[0].limitsFisicas.error}
                    dispatchValue={dispatchValue}
                    mapperKey="limitsFisicas"
                />
                <BasicInput
                    label="Enfermedades o intervenciones"
                    value={form[0].enferm.value}
                    errorText={form[0].enferm.error}
                    dispatchValue={dispatchValue}
                    mapperKey="enferm"
                />
                <BasicInput
                    label="Tratamiento médico"
                    value={form[0].tratMed.value}
                    errorText={form[0].tratMed.error}
                    dispatchValue={dispatchValue}
                    mapperKey="tratMed"
                />
                <BasicInput
                    label="Medicamentos"
                    value={form[0].medicamentos.value}
                    errorText={form[0].medicamentos.error}
                    dispatchValue={dispatchValue}
                    mapperKey="medicamentos"
                />
                <BasicInput
                    label="Contactos de emergencia"
                    value={form[0].contactoEmergencia.value}
                    errorText={form[0].contactoEmergencia.error}
                    dispatchValue={dispatchValue}
                    mapperKey="contactoEmergencia"
                />
                <BasicInput
                    label="Personas autorizadas a recoger al alumno"
                    value={form[0].personasAutorizadas.value}
                    errorText={form[0].personasAutorizadas.error}
                    dispatchValue={dispatchValue}
                    mapperKey="personasAutorizadas"
                />
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
                    label="Password"
                    value={form[0].password.value}
                    errorText={form[0].password.error}
                    type="password"
                    dispatchValue={dispatchValue}
                    mapperKey="password"
                />
            </Grid>
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
