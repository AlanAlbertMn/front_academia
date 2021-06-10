import React, {useContext, useEffect, useState} from "react";
//RootComponents
import BasicTable from "../../BasicComponents/BasicTable";
import {columns, content} from "./utils";
import BasicContainer from "../../BasicComponents/BasicContainer";
import {withRouter} from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import {compose} from 'recompose';
import {withFirebase} from "../../Firebase";

import {format} from 'date-fns'

const loadSales = async ({firebase}) => {
    let finalSales = []
    const sales = await firebase.getSales()

    if (sales && Array.isArray(sales)) finalSales = sales.map(sale => ({
        ...sale,
        student: sale.student.name,
        product: sale.product.name,
        total: `$${sale.total}`,
        date: format(new Date(sale.date), 'dd/MM/yyyy')
    }))
    
    return finalSales
}

function ShowSales({history, firebase}) {
    const [sales, setSales] = useState([])
    const appProvider = useContext(AppContext);

    useEffect(() => {
        loadSales({firebase}).then(res => setSales(res))
    }, [firebase, appProvider])

    const refetch = () => {
        loadSales({firebase}).then(res => setSales(res))
    }

    return (
        <BasicContainer>
            <BasicTable
                columns={columns}
                title={content.title}
                history={history}
                addLink={content.addLink}
                data={sales}
                content={content}
                refetch={refetch}
                deleteMutation={firebase.removeSale}
                role={appProvider.user.role}
            />
        </BasicContainer>
    );
}


export default compose(withRouter, withFirebase)(ShowSales)
