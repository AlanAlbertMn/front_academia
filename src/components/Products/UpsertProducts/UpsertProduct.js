import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import BasicButton from "../../BasicComponents/BasicButton";
import useFormReducer from "../../../utils/useFormReducer";
import BasicAlert from '../../BasicComponents/BasicAlert'
import moment from 'moment'

import BasicContainer from "../../BasicComponents/BasicContainer";
import useUpsertProductStyles from "./styles";

import {compose} from 'recompose'

import {validations} from "./utils";
import {withRouter} from "react-router";
import {withFirebase} from "../../Firebase";
import BasicLoading from "../../BasicComponents/BasicLoading";
import UpsertProductForm from "./UpsertProductForm";

const validateRenovation = ({form, autorenovable}) => {
    if (autorenovable === false) return true
    return !((form.renovationSpan.value || form.lastRenovation.value || form.renovationUnit) &&
        (!form.renovationSpan.value || !form.lastRenovation.value || !form.lastRenovation.value));
}

const payloadFactory = ({form, autorenovable}) => {
    const payload = {}

    if (autorenovable) {
        payload.renovationSpan = form.renovationSpan.value
        payload.renovationUnit = form.renovationUnit.value
        payload.lastRenovation = form.lastRenovation.value
    }

    delete form.renovationSpan
    delete form.renovationUnit
    delete form.lastRenovation

    for (const formKey in form) {
        if (form.hasOwnProperty(formKey)){
            payload[formKey] = form[formKey].value
        }
    }

    return payload
}

function UpsertProduct({history, match, firebase}) {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [product, setProduct] = useState(null)
    const [alert, handleAlert] = useState({
        open: false,
        text: "",
    });

    const [form, dispatchForm, {updateForm, validateForm}] = useFormReducer({
        initialState: [
            {
                name: {
                    value: '',
                    valid: false,
                    error: null,
                },
                renovationSpan: {
                    value: '',
                    valid: false,
                    error: null,
                },
                renovationUnit: {
                    value: '',
                    valid: false,
                    error: null,
                },
                lastRenovation: {
                    value: moment(),
                    valid: true,
                    error: null,
                },
                cost: {
                    value: 0,
                    valid: true,
                    error: null,
                },
                quantity: {
                    value: 0,
                    valid: true,
                    error: null
                },
                autorenovable: {
                    value: false,
                    valid: true,
                    error: null
                }
            },
        ],
        validations,
    });

    match.params.product && delete validations.lastRenovation

    useEffect(() => {
        firebase.getStudents().then(res => {
            setStudents(res)

            if (match.params.product) {
                firebase.getProduct({id: match.params.product}).then(res => {
                    setProduct(res)
                })
            }
            setLoading(false)
        }).catch(error => {
            handleError(error.message || 'Registro de productos no disponible por el momento, contacta al administrador')
        })

    }, [firebase, match])

    const classes = useUpsertProductStyles();


    const handleOnCompleted = () => {
        history.replace("/productos");
    };

    const handleError = (text) => {
        setError(true)
        handleAlert({
            open: true,
            text,
        });
    };

    const next = () => {
        const valid = validateForm();
        const validRenovation = validateRenovation({form: form[0], autorenovable: form[0].autorenovable.value})
        if (valid && validRenovation) {
            const payload = payloadFactory({form: form[0], autorenovable: form[0].autorenovable.value})

            firebase.upsertProduct({
                data: {
                    ...payload,
                    ...(product ? { id: product.id } : {})
                }
            }).then(res => handleOnCompleted())
        }

        if (!validRenovation) {
            handleAlert({
                open: true,
                text: 'Periodo entre renovaciones, unidad del periodo y fecha de inicio son requeridos',
            });
        }
    };

    if (error) {
        return null;
    }

    if (loading) {
        return <BasicLoading/>
    }

    return (
        <BasicContainer justify='flex-start' alignContent='flex-start'>
            <Grid item xs={12} className={classes.title}>
                <Typography
                    variant="h3">{match.params.product ? 'Actualizar producto' : 'Crear producto'}</Typography>
            </Grid>
            <UpsertProductForm
                dispatchForm={dispatchForm}
                form={form}
                instructors={students}
                updateForm={updateForm}
                product={product}
            />
            <Grid item xs={12} container justify="center" className={classes.title}>
                <BasicButton handleClick={next} fullWidth color="primary">
                    {match.params.product ? 'Actualizar producto' : 'Crear producto'}
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


export default compose(withRouter, withFirebase)(UpsertProduct)