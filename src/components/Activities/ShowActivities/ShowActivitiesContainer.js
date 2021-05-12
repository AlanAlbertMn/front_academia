import React, {useEffect, useState} from "react";
//RootComponents
import BasicTable from "../../BasicComponents/BasicTable";
import {columns, content} from "./utils";
import BasicContainer from "../../BasicComponents/BasicContainer";
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../../Firebase';

const loadActivities = async ({ firebase }) => {
    let activities = []
    const activitiesFromServer = await firebase.getActivities()

    if (activitiesFromServer && Array.isArray(activitiesFromServer)) activities = activitiesFromServer

    return activities
}

function ShowActivitiesContainer({ history, firebase }) {
    const [activities, setActivities] = useState([])

    useEffect(() => {
        loadActivities({firebase}).then(res => setActivities(res))
    }, [])



    return (
        <BasicContainer>
            <BasicTable
                columns={columns}
                title={content.title}
                history={history}
                addLink={content.addLink}
                data={activities}
                content={content}
                deleteMutation={firebase.removeActivity}
            />
        </BasicContainer>
    );
}


export default compose(withRouter, withFirebase)(ShowActivitiesContainer)
