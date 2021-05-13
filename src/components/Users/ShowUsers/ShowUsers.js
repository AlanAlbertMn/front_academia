import React, {useEffect, useState, useContext} from "react";
//RootComponents
import BasicTable from "../../BasicComponents/BasicTable";
import {columns, content} from "./utils";
import BasicContainer from "../../BasicComponents/BasicContainer";
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../../Firebase';
import BasicLoading from "../../BasicComponents/BasicLoading";
import AppContext from '../../Context/AppContext';


function ShowUsers({history, firebase, match}) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [users, setUsers] = useState([])
    const appContext = useContext(AppContext)

    useEffect(() => {
        firebase.getUsers().then(res => {
            setUsers(res)
            setIsLoading(false)
        }).catch(error => setError(true))
    }, [firebase, match])

    const refetch = () => {
        firebase.getUsers().then(res => setUsers(res))
    }

    const handleEdit = (id) => {
        history.push(content.updateLink + id)
    }

    if (error) {
        return null
    }

    if (isLoading) {
        return <BasicLoading/>
    }

    return (
        <BasicContainer>
            <BasicTable
                columns={columns}
                title={content.title}
                handleEdit={handleEdit} To be implemented later on
                history={history}
                data={users}
                content={content}
                refetch={refetch}
                addLink={content.addLink}
                role={appContext.user.role}
            />
        </BasicContainer>
    );
}


export default compose(withRouter, withFirebase)(ShowUsers)
