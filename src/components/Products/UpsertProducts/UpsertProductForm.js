import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState, useMemo} from "react";
import BasicAutocomplete from "../../BasicComponents/BasicAutocomplete";
import BasicInput from "../../BasicComponents/BasicInput";
import BasicButton from "../../BasicComponents/BasicButton";
import useFormReducer from "../../../utils/useFormReducer";
import BasicAlert from '../../BasicComponents/BasicAlert'

import BasicContainer from "../../BasicComponents/BasicContainer";
import {createProduct} from "../../Firebase/Create";
import useUpsertProductStyles from "./styles";
import {validations} from "./utils";

export default function UpsertProductForm({history, product, dispatchForm, form, updateForm, next}) {
    const initialValues = useMemo(() => product ? {...product} : {
        name: '',
        cost: 0,
        period: '',
        type: ''
    }, [product])

    const classes = useUpsertProductStyles();

    useEffect(() => {
        dispatchForm({
            newState: [
                {
                    name: {
                        value: initialValues.name,
                        valid: false,
                        error: null,
                    },
                    cost: {
                        value: initialValues.costPerHour,
                        valid: false,
                        error: null,
                    },
                    period: {
                        value: initialValues.period,
                        valid: false,
                        error: null,
                    },
                    type: {
                        value: initialValues.period,
                        valid: false,
                        error: null,
                    },
                }
            ],
            type: 'set'
        })
    }, [dispatchForm, initialValues])

    const dispatchValue = ({key, value}) => {
        updateForm({key, value, index: 0});
    };

    return (
        <>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Nombre"
                    value={form[0].name.value}
                    errorText={form[0].name.error}
                    dispatchValue={dispatchValue}
                    mapperKey="name"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Costo del producto"
                    value={form[0].cost.value}
                    errorText={form[0].cost.error}
                    dispatchValue={dispatchValue}
                    mapperKey="cost"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Periodicidad"
                    value={form[0].period.value}
                    errorText={form[0].period.error}
                    dispatchValue={dispatchValue}
                    mapperKey="period"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Tipo"
                    value={form[0].type.value}
                    errorText={form[0].type.error}
                    dispatchValue={dispatchValue}
                    mapperKey="type"
                />
            </Grid>
        </>
    )
}
