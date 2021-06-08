import React, {useContext, useEffect, useState} from "react";
//RootComponents
import BasicTable from "../../BasicComponents/BasicTable";
import {columns, content} from "./utils";
import BasicContainer from "../../BasicComponents/BasicContainer";
import {withRouter} from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import {compose} from 'recompose';
import {withFirebase} from '../../Firebase';

const loadProducts = async ({firebase, id, role}) => {
    let products = []
    const activitiesFromServer = await firebase.getProductsByRole({id, role})
    return activities
}

function ShowProductsContainer({history, firebase}) {
    const [products, setProducts] = useState([])
    const appProvider = useContext(AppContext);

    const handleEdit = (id) => {
        history.push(content.updateLink + id)
    }

    const handleStudents = (id) => {
        history.push(content.studentsLink + id)
    }

    console.log(appProvider)

    useEffect(() => {
        loadProducts({firebase, id: appProvider.user, role: appProvider.user.role}).then(res => setProduct(res))
    }, [firebase, appProvider])

    const refetch = () => {
        loadProducts({firebase, id: appProvider.user, role: appProvider.user.role}).then(res => setProducts(res))
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


export default compose(withRouter, withFirebase)(ShowProductsContainer)
