import {Grid} from "@material-ui/core";
import React from "react";
import BasicAutocomplete from "../../BasicComponents/BasicAutocomplete";
import BasicInput from "../../BasicComponents/BasicInput";
import useUpsertProductStyles from "./styles";

const getTotal = ({form, product, products}) => {
    if (form.quantity && product) {
        return form.quantity.value * product.cost
    }

    return 0
}

const getPrice = ({product}) => {
    if (product && product.cost) return product.cost

    return 0
}

const getAvailable = ({product}) => {
    if (product && product.quantity) return product.quantity

    return 0
}

export default function UpsertSaleForm({product, form, updateForm, students, products}) {
    const classes = useUpsertProductStyles();

    const dispatchValue = ({key, value}) => {
        updateForm({key, value, index: 0});
    };

    return (
        <>
            <Grid item xs={12} className={classes.field}>
                <BasicAutocomplete
                    dispatchValue={dispatchValue}
                    mapperKey="product"
                    label="Producto"
                    raw={true}
                    value={form[0].product.value}
                    errorText={form[0].product.error}
                    options={products}
                    multiple={false}
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicAutocomplete
                    dispatchValue={dispatchValue}
                    raw={true}
                    mapperKey="student"
                    label="Estudiante"
                    value={form[0].student.value}
                    errorText={form[0].student.error}
                    options={students}
                    multiple={false}
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Cantidad"
                    value={form[0].quantity.value}
                    errorText={form[0].quantity.error}
                    dispatchValue={dispatchValue}
                    mapperKey="quantity"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Disponibles"
                    value={getAvailable({product: form[0].product.value})}
                    disabled
                    dispatchValue={() => {}}
                    mapperKey="available"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Precio"
                    value={getPrice({product: form[0].product.value})}
                    disabled
                    dispatchValue={() => {}}
                    mapperKey="price"
                />
            </Grid>
            <Grid item xs={12} className={classes.field}>
                <BasicInput
                    label="Total"
                    value={getTotal({product: form[0].product.value, form: form[0]})}
                    disabled
                    dispatchValue={() => {}}
                    mapperKey="total"
                />
            </Grid>
        </>
    )
}
