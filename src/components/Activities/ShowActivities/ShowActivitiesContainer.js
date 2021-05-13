import React, {useContext, useEffect, useState} from "react";
//RootComponents
import BasicTable from "../../BasicComponents/BasicTable";
import {columns, content} from "./utils";
import BasicContainer from "../../BasicComponents/BasicContainer";
import {withRouter} from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import {compose} from 'recompose';
import {withFirebase} from '../../Firebase';

const loadActivities = async ({firebase, id, role}) => {
    let activities = []
    const activitiesFromServer = await firebase.getActivitiesByRole({id, role})

    if (activitiesFromServer && Array.isArray(activitiesFromServer)) activities = activitiesFromServer.map(activity => ({
        ...activity,
        instructors: activity.instructors.map(instructor => instructor.name).join(' | ')
    }))
    return activities
}

function ShowActivitiesContainer({history, firebase}) {
    const [activities, setActivities] = useState([])
    const appProvider = useContext(AppContext);

    const handleEdit = (id) => {
        history.push(content.updateLink + id)
    }

    const handleStudents = (id) => {
        history.push(content.studentsLink + id)
    }

    console.log(appProvider)

    useEffect(() => {
        loadActivities({firebase, id: appProvider.user, role: appProvider.user.role}).then(res => setActivities(res))
    }, [firebase, appProvider])

    const refetch = () => {
        loadActivities({firebase, id: appProvider.user, role: appProvider.user.role}).then(res => setActivities(res))
    }

    return (
        <BasicContainer>
            <BasicTable
                columns={columns}
                title={content.title}
                history={history}
                addLink={content.addLink}
                data={activities}
                content={content}
                handleEdit={handleEdit}
                refetch={refetch}
                deleteMutation={firebase.removeActivity}
                handleExtraAction={handleStudents}
                role={appProvider.user.role}
            />
        </BasicContainer>
    );
}


export default compose(withRouter, withFirebase)(ShowActivitiesContainer)
