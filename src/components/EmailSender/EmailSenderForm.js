import {Grid} from "@material-ui/core";
import React from "react";
import BasicInput from "../BasicComponents/BasicInput";
import useEmailSenderStyles from "./styles";
import BasicAutocomplete from "../BasicComponents/BasicAutocomplete";

export default function EmailSenderForm({form, updateForm, students}) {
    const classes = useEmailSenderStyles();

    const dispatchValue = ({key, value}) => {
        updateForm({key, value, index: 0});
    };

    return (
        <>
            <Grid item xs={12} className={classes.field}>
                <BasicAutocomplete
                    value={form[0].student.value}
                    raw={true}
                    dispatchValue={dispatchValue}
                    label='Estudiante'
                    options={students}
                    mapperKey='student'
                    errorText={form[0].student.error}
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    id="message"
                    value={form[0].message.value}
                    dispatchValue={dispatchValue}
                    errorText={form[0].message.error}
                    mapperKey={'message'}
                    multiline
                />
            </Grid>
        </>
    )
}
