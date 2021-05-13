import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import BasicButton from "../../BasicComponents/BasicButton";
import useFormReducer from "../../../utils/useFormReducer";
import BasicAlert from '../../BasicComponents/BasicAlert'

import UpsertActivityForm from "./UpsertActivityForm";

import BasicContainer from "../../BasicComponents/BasicContainer";
import useUpsertActivityStyles from "./styles";

import {compose} from 'recompose'

import {validations} from "./utils";
import {withRouter} from "react-router";
import {withFirebase} from "../../Firebase";
import BasicLoading from "../../BasicComponents/BasicLoading";

function UpsertActivityContainer({history, match, firebase}) {
    const [instructors, setInstructors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [activity, setActivity] = useState(null)
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
                schedule: {
                    value: '',
                    valid: false,
                    error: null,
                },
                hoursPerWeek: {
                    value: '',
                    valid: false,
                    error: null,
                },
                instructors: {
                    value: [],
                    valid: true,
                    error: null,
                },
                costPerHour: {
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

            if (match.params.activity) {
                firebase.getActivity({id: match.params.activity}).then(res => {
                    setActivity(res)
                })
            }
            setLoading(false)
        }).catch(error => {
            handleError(error.message || 'Registro de actividades no disponible por el momento, contacta al administrador')
        })

    }, [firebase, match])

    const classes = useUpsertActivityStyles();


    const handleOnCompleted = () => {
        history.replace("/actividades");
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
            firebase.upsertActivity({
                data: {
                    name: form[0].name.value,
                    schedule: form[0].schedule.value,
                    hoursPerWeek: form[0].hoursPerWeek.value,
                    costPerHour: form[0].costPerHour.value,
                    instructors: form[0].instructors.value,
                    ...(match.params.activity ? {id: match.params.activity} : {}),
                    shouldUpdate: !!match.params.activity
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
                    variant="h3">{match.params.activity ? 'Actualizar actividad' : 'Crear actividad'}</Typography>
            </Grid>
            <UpsertActivityForm
                dispatchForm={dispatchForm}
                form={form}
                instructors={instructors}
                updateForm={updateForm}
                activity={activity}

            />
            <Grid item xs={12} container justify="center" className={classes.title}>
                <BasicButton handleClick={next} fullWidth color="primary">
                    {match.params.activity ? 'Actualizar actividad' : 'Crear actividad'}
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


export default compose(withRouter, withFirebase)(UpsertActivityContainer)