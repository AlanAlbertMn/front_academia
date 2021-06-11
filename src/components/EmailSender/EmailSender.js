import React, {useEffect, useState} from "react";
//RootComponents
import {withFirebase} from "../Firebase";
import {withRouter} from 'react-router-dom';
import useEmailSenderStyles from "./styles";
import {validations} from "./utils";
import useFormReducer from "../../utils/useFormReducer";
import BasicAlert from "../BasicComponents/BasicAlert";
import BasicLoading from "../BasicComponents/BasicLoading";
import BasicContainer from "../BasicComponents/BasicContainer";
import BasicButton from "../BasicComponents/BasicButton";
import EmailSenderForm from "./EmailSenderForm";
import {Typography, Grid} from "@material-ui/core";


import {compose} from 'recompose';

function EmailSender({history, match, firebase}) {
    const activity = match.params?.activity
    const classes = useEmailSenderStyles();
    const [loading, setLoading] = useState(true)
    const [students, setStudents] = useState()

    const [alert, handleAlert] = useState({
        open: false,
        text: "",
    });

    const [form, dispatchForm, {updateForm, validateForm, getValues}] = useFormReducer({
        initialState: [
            {
                message: {
                    value: '',
                    valid: false,
                    error: null,
                },
                student: {
                    value: '',
                    valid: false,
                    error: null
                }
            },
        ],
        validations,
    });

    useEffect(() => {
        firebase.getActivity({id: activity}).then(res => {
            setStudents(res.inscribed)
            setLoading(false)
        })
    })

    const handleOnCompleted = async (res) => {
        history.push('/actividades')
    };

    const next = () => {
        const valid = validateForm();
        const values = getValues()[0]

        if (valid) {
            firebase.mailServer.sendMail({
                message: values.message,
                to_name: values.student.name,
                template: 'message',
                email: values.student.email,
            }).then(res => handleOnCompleted())
        }
    };

    if(loading) return <BasicLoading/>

    if (!match.params?.activity) {
        return null
    }

    return (
        <BasicContainer justify='flex-start' alignContent='flex-start'>
            <Grid item xs={12} className={classes.title}>
                <Typography
                    variant="h3">Servicio de correo</Typography>
            </Grid>
            <EmailSenderForm
                dispatchForm={dispatchForm}
                form={form}
                students={students}
                updateForm={updateForm}
            />
            <Grid item xs={12} container justify="center" className={classes.title}>
                <BasicButton handleClick={next} fullWidth color="primary">
                    Enviar mensaje
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


export default compose(withRouter, withFirebase)(EmailSender)
