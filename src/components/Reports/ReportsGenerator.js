import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import BasicButton from "../BasicComponents/BasicButton";
import useFormReducer from "../../utils/useFormReducer";
import BasicAlert from '../BasicComponents/BasicAlert'
import BasicContainer from "../BasicComponents/BasicContainer";
import useReportGeneratorStyles from "./styles";

import {compose} from 'recompose'

import {validations} from "./utils";
import {withRouter} from "react-router";
import {withFirebase} from "../Firebase";
import BasicLoading from "../BasicComponents/BasicLoading";
import ReportsGeneratorForm from "./ReportsGeneratorForm";

function ReportsGenerator({history, match, firebase}) {
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
                after: {
                    value: '',
                    valid: false,
                    error: null,
                },
                before: {
                    value: '',
                    valid: false,
                    error: null,
                },
            },
        ],
        validations,
    });


    const classes = useReportGeneratorStyles();

    const handleOnCompleted = async (res) => {
        console.log(res);
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
            firebase.getSalesFromInterval({
                ...values
            }).then(res => handleOnCompleted(res))
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
            <ReportsGeneratorForm
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


export default compose(withRouter, withFirebase)(ReportsGenerator)