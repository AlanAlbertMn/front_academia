import {Grid} from "@material-ui/core";
import React from "react";
import BasicAutocomplete from "../BasicComponents/BasicAutocomplete";
import useInscriptionStyles from "./styles";

export default function InscriptionForm({history, students, activity, next, updateForm, form, dispatchForm}) {
    const classes = useInscriptionStyles();

    const dispatchValue = ({key, value}) => {
        updateForm({key, value, index: 0});
    };


    return (
        <>
            <Grid item xs={12} className={classes.field}>
                <BasicAutocomplete
                    dispatchValue={dispatchValue}
                    mapperKey="students"
                    label="Estudiantes"
                    value={form[0].students.value}
                    errorText={form[0].students.error}
                    options={students}
                    multiple={true}
                />
            </Grid>
        </>
    )
}
