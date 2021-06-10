import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import BasicButton from "../../BasicComponents/BasicButton";
import useFormReducer from "../../../utils/useFormReducer";
import BasicAlert from '../../BasicComponents/BasicAlert'
import BasicContainer from "../../BasicComponents/BasicContainer";
import useUpsertSaleStyles from "./styles";

import {compose} from 'recompose'

import {validations} from "./utils";
import {withRouter} from "react-router";
import {withFirebase} from "../../Firebase";
import BasicLoading from "../../BasicComponents/BasicLoading";
import UpsertSaleForm from "./UpsertSaleForm";

function UpsertSale({history, match, firebase}) {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [products, setProducts] = useState([])
    const [alert, handleAlert] = useState({
        open: false,
        text: "",
    });

    const [form, dispatchForm, {updateForm, validateForm, getValues}] = useFormReducer({
        initialState: [
            {
                product: {
                    value: '',
                    valid: false,
                    error: null,
                },
                student: {
                    value: '',
                    valid: false,
                    error: null,
                },
                quantity: {
                    value: 0,
                    valid: true,
                    error: null
                },
            },
        ],
        validations,
    });

    useEffect(() => {
        firebase.getStudents().then(res => {
            setStudents(res)
        }).then(res => {
            firebase.getProducts().then(res => {
                setProducts(res)
                setLoading(false)
            })
        }).catch(error => {
            handleError(error.message || 'Registro de productos no disponible por el momento, contacta al administrador')
        })

    }, [firebase, match])

    const classes = useUpsertSaleStyles();

    const handleOnCompleted = async () => {
        await firebase.mailServer.sendMail({
            email: form[0].student.value.email,
            message: `Se ha registrado la compra de ${form[0].product.value.name}`,
            to_name: form[0].student.value.name,
            template: 'purchase'
        })

        history.replace("/ventas");
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
        const values = getValues()[0]

        if (valid) {
            firebase.registerSale({
                ...values
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
                    variant="h3">Registrar venta</Typography>
            </Grid>
            <UpsertSaleForm
                dispatchForm={dispatchForm}
                form={form}
                students={students}
                products={products}
                updateForm={updateForm}
            />
            <Grid item xs={12} container justify="center" className={classes.title}>
                <BasicButton handleClick={next} fullWidth color="primary">
                    Registrar venta
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


export default compose(withRouter, withFirebase)(UpsertSale)