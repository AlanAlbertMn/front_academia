import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useMemo} from "react";
import BasicAutocomplete from "../../BasicComponents/BasicAutocomplete";
import BasicInput from "../../BasicComponents/BasicInput";
import moment from 'moment'
import useUpsertProductStyles from "./styles";
import {renovationUnits} from "../../Activities/UpsertActivities/utils";
import BasicCheckbox from "../../BasicComponents/BasicCheckbox";

export default function UpsertProductForm({product, dispatchForm, form, updateForm}) {
    const initialValues = useMemo(() => product ? {...product} : {
        name: '',
        renovationSpan: '',
        renovationUnit: 'WEEKLY',
        cost: 0,
        quantity: '',
        autorenovable: false,
        lastRenovation: moment().format('yyyy-MM-DD')
    }, [product])

    const classes = useUpsertProductStyles();

    useEffect(() => {
        dispatchForm({
            newState: [
                {
                    autorenovable: {
                        value: false,
                        valid: false,
                        error: null
                    },
                    name: {
                        value: initialValues.name,
                        valid: false,
                        error: null,
                    },
                    renovationSpan: {
                        value: initialValues.renovationSpan,
                        valid: false,
                        error: null,
                    },
                    renovationUnit: {
                        value: initialValues.renovationUnit,
                        valid: false,
                        error: null,
                    },
                    cost: {
                        value: initialValues.cost,
                        valid: true,
                        error: null,
                    },
                    lastRenovation: {
                        value: initialValues.lastRenovation,
                        valid: false,
                        error: null,
                    },
                    quantity: {
                        value: initialValues.quantity,
                        valid: false,
                        error: null
                    }
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
                <BasicCheckbox
                    label='Se autorenueva'
                    dispatchValue={dispatchValue}
                    value={form[0].autorenovable.value}
                    mapperKey='autorenovable'
                />
            </Grid>
            {
                form[0].autorenovable.value === true &&
                <>
                    <Grid item xs={12} className={classes.field}>
                        <BasicInput
                            label="Periodo entre renovaciones"
                            value={form[0].renovationSpan.value}
                            errorText={form[0].renovationSpan.error}
                            dispatchValue={dispatchValue}
                            mapperKey="renovationSpan"
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <BasicAutocomplete
                            dispatchValue={dispatchValue}
                            mapperKey="renovationUnit"
                            label="Unidad del periodo"
                            value={form[0].renovationUnit.value}
                            errorText={form[0].renovationUnit.error}
                            options={renovationUnits}
                            multiple={false}
                        />
                    </Grid>
                </>
            }
            {
                !product && form[0].autorenovable.value &&
                <Grid item xs={12} className={classes.field}>
                    <Typography>Fecha de inicio</Typography>
                    <BasicInput
                        id="date"
                        value={form[0].lastRenovation.value}
                        dispatchValue={dispatchValue}
                        type="date"
                        errorText={form[0].lastRenovation.error}
                        mapperKey={'lastRenovation'}
                    />
                </Grid>
            }
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Costo"
                    value={form[0].cost.value}
                    errorText={form[0].cost.error}
                    dispatchValue={dispatchValue}
                    mapperKey="cost"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Cantidad disponible"
                    value={form[0].quantity.value}
                    errorText={form[0].quantity.error}
                    dispatchValue={dispatchValue}
                    mapperKey="quantity"
                />
            </Grid>
        </>
    )
}
