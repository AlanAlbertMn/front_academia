import {Grid, Typography} from "@material-ui/core";
import React from "react";
import BasicInput from "../BasicComponents/BasicInput";
import useReportsGeneratorStyles from "./styles";

export default function ReportsGeneratorForm({form, updateForm}) {
    const classes = useReportsGeneratorStyles();

    const dispatchValue = ({key, value}) => {
        updateForm({key, value, index: 0});
    };

    return (
        <>
            <Grid item xs={12} className={classes.field}>
                <Typography>Inicio del periodo</Typography>
                <BasicInput
                    id="date"
                    value={form[0].after.value}
                    dispatchValue={dispatchValue}
                    type="date"
                    errorText={form[0].after.error}
                    mapperKey={'after'}
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <Typography>Fin del periodo</Typography>
                <BasicInput
                    id="date"
                    value={form[0].before.value}
                    dispatchValue={dispatchValue}
                    type="date"
                    errorText={form[0].before.error}
                    mapperKey={'before'}
                />
            </Grid>
        </>
    )
}
