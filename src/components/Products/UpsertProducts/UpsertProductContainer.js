import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import BasicButton from "../../BasicComponents/BasicButton";
import useFormReducer from "../../../utils/useFormReducer";
import BasicAlert from '../../BasicComponents/BasicAlert'

import UpsertProductForm from "./UpsertProductForm";

import BasicContainer from "../../BasicComponents/BasicContainer";
import useUpsertProductStyles from "./styles";

import {compose} from 'recompose'

import {validations} from "./utils";
import {withRouter} from "react-router";
import {withFirebase} from "../../Firebase";
import BasicLoading from "../../BasicComponents/BasicLoading";

function UpsertProductContainer({history, match, firebase}) {
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
                cost: {
                    value: '',
                    valid: false,
                    error: null,
                },
                period: {
                    value: '',
                    valid: false,
                    error: null,
                },
                type: {
                    value: '',
                    valid: false,
                    error: null,
                },
            },
        ],
        validations,
    });

    useEffect(() => {
        firebase.getInstructors().then(res => {
            setInstructors(res)

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
        if (valid) {
            firebase.upsertProduct({
                data: {
                    name: form[0].name.value,
                    cost: form[0].cost.value,
                    period: form[0].period.value,
                    type: form[0].type.value,
                    ...(match.params.product ? {id: match.params.product} : {}),
                    shouldUpdate: !!match.params.product
                }
            }).then(res => handleOnCompleted())
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


export default compose(withRouter, withFirebase)(UpsertProductContainer)