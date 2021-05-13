import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState, useMemo} from "react";
import BasicAutocomplete from "../../BasicComponents/BasicAutocomplete";
import BasicInput from "../../BasicComponents/BasicInput";
import BasicButton from "../../BasicComponents/BasicButton";
import useFormReducer from "../../../utils/useFormReducer";
import BasicAlert from '../../BasicComponents/BasicAlert'

import BasicContainer from "../../BasicComponents/BasicContainer";
import {createActivity} from "../../Firebase/Create";
import useUpsertActivityStyles from "./styles";

import {validations} from "./utils";

export default function UpsertActivityForm({history, instructors, activity, dispatchForm, form, updateForm, next}) {
    const initialValues = useMemo(() => activity ? {...activity} : {
        name: '',
        schedule: [],
        hoursPerWeek: '',
        instructors: [],
        costPerHour: 0
    }, [activity])

    const classes = useUpsertActivityStyles();

    useEffect(() => {
        dispatchForm({
            newState: [
                {
                    name: {
                        value: initialValues.name,
                        valid: false,
                        error: null,
                    },
                    schedule: {
                        value: initialValues.schedule,
                        valid: false,
                        error: null,
                    },
                    hoursPerWeek: {
                        value: initialValues.hoursPerWeek,
                        valid: false,
                        error: null,
                    },
                    instructors: {
                        value: initialValues.instructors,
                        valid: true,
                        error: null,
                    },
                    costPerHour: {
                        value: initialValues.costPerHour,
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
                <BasicAutocomplete
                    dispatchValue={dispatchValue}
                    mapperKey="instructors"
                    label="Instructores"
                    value={form[0].instructors.value}
                    errorText={form[0].instructors.error}
                    options={instructors}
                    multiple={true}
                />

            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Horas por semana"
                    value={form[0].hoursPerWeek.value}
                    errorText={form[0].hoursPerWeek.error}
                    dispatchValue={dispatchValue}
                    mapperKey="hoursPerWeek"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Horario"
                    value={form[0].schedule.value}
                    errorText={form[0].schedule.error}
                    dispatchValue={dispatchValue}
                    mapperKey="schedule"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Precio por hora"
                    value={form[0].costPerHour.value}
                    errorText={form[0].costPerHour.error}
                    dispatchValue={dispatchValue}
                    mapperKey="costPerHour"
                />
            </Grid>
        </>
    )
}
