import React, {useContext, useEffect, useState} from "react";
//RootComponents
import BasicTable from "../../BasicComponents/BasicTable";
import {columns, content} from "./utils";
import BasicContainer from "../../BasicComponents/BasicContainer";
import {withRouter} from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import {compose} from 'recompose';
import {withFirebase} from '../../Firebase';

const loadProducts = async ({firebase}) => {
    let finalProducts = []
    const products = await firebase.getProducts()

    if (products && Array.isArray(products)) finalProducts = products.map(product => ({
        ...product,
    }))
    return finalProducts
}

function ShowActivitiesContainer({history, firebase}) {
    const [products, setProducts] = useState([])
    const appProvider = useContext(AppContext);

    const handleEdit = (id) => {
        history.push(content.updateLink + id)
    }

    const handleStudents = (id) => {
        history.push(content.studentsLink + id)
    }

    useEffect(() => {
        loadProducts({firebase}).then(res => setProducts(res))
    }, [firebase, appProvider])

    const refetch = () => {
        loadProducts({firebase}).then(res => setProducts(res))
    }

    return (
        <BasicContainer>
            <BasicTable
                columns={columns}
                title={content.title}
                history={history}
                addLink={content.addLink}
                data={products}
                content={content}
                handleEdit={handleEdit}
                refetch={refetch}
                deleteMutation={firebase.removeProduct}
                handleExtraAction={handleStudents}
                role={appProvider.user.role}
            />
        </BasicContainer>
    );
}


export default compose(withRouter, withFirebase)(ShowActivitiesContainer)
