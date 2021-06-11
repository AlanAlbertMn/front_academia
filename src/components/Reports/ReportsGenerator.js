import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import BasicButton from "../BasicComponents/BasicButton";
import useFormReducer from "../../utils/useFormReducer";
import BasicAlert from '../BasicComponents/BasicAlert'
import BasicContainer from "../BasicComponents/BasicContainer";
import useReportGeneratorStyles from "./styles";
import moment from "moment";

import {compose} from 'recompose'
import {CSVLink} from "react-csv";

import {validations} from "./utils";
import {withRouter} from "react-router";
import {withFirebase} from "../Firebase";
import ReportsGeneratorForm from "./ReportsGeneratorForm";


const formatSales = ({unformattedSales}) => unformattedSales.map(ufSale => ({
    ...ufSale,
    date: moment(ufSale.date).format('DD-MM-yyyy'),
    student: ufSale.student.name,
    product: ufSale.product.name
}))

const generateFileName = () => {
    const generationTime = new Date()
    return `${moment().format('dd-MM-yyyy')}_reporte_ventas_${generationTime.getHours()}_${generationTime.getMinutes()}_${new Date().getSeconds()}`
}

function ReportsGenerator({history, match, firebase}) {
    const [error, setError] = useState()

    const [alert, handleAlert] = useState({
        open: false,
        text: "",
    });

    const [sales, setSales] = useState(null)

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
        setSales(formatSales({unformattedSales: res}))
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

    return (
        <BasicContainer justify='flex-start' alignContent='flex-start'>
            <Grid item xs={12} className={classes.title}>
                <Typography
                    variant="h3">Generador de reportes</Typography>
            </Grid>
            <ReportsGeneratorForm
                dispatchForm={dispatchForm}
                form={form}
                updateForm={updateForm}
            />
            <Grid item xs={12} container justify="center" className={classes.title}>
                <BasicButton handleClick={next} fullWidth color="primary">
                    Generar reporte
                </BasicButton>
            </Grid>
            <BasicAlert
                open={alert.open}
                handleAlert={handleAlert}
                severity="error"
                text={alert.text}
            />
            {
                sales &&
                <CSVLink filename={generateFileName()} data={sales}>Descargar reporte</CSVLink>
            }

        </BasicContainer>
    );
}


export default compose(withRouter, withFirebase)(ReportsGenerator)