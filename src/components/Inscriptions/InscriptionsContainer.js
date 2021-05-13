import React, {useEffect, useState, useContext} from "react";
//RootComponents
import BasicTable from "../BasicComponents/BasicTable";
import {columns, content} from "./utils";
import BasicContainer from "../BasicComponents/BasicContainer";
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import _ from 'lodash'
import BasicLoading from "../BasicComponents/BasicLoading";
import InscriptionsModal from './InscriptionModal'
import useFormReducer from "../../utils/useFormReducer";
import {validations} from "../Activities/UpsertActivities/utils";
import AppContext from '../Context/AppContext';


function InscriptionsContainer({history, firebase, match}) {
    const [activity, setActivity] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [students, setStudents] = useState([])
    const appContext = useContext(AppContext)

    const [form, dispatchForm, {updateForm, validateForm, resetForm}] = useFormReducer({
        initialState: [
            {
                students: {
                    value: [],
                    valid: false,
                    error: null,
                },
            },
        ],
        validations,
    });


    useEffect(() => {
        firebase.getActivity({id: match.params.activity}).then(res => {
            setActivity(res)
            firebase.getStudents().then(res => setStudents(res)).catch(error => setError(true))
            setIsLoading(false)
        }).catch(error => setError(true))
    }, [firebase, match])

    const handleDelete = (id) => {
        firebase.upsertActivity({
            data: {
                ...activity,
                inscribed: activity?.inscribed && Array.isArray(activity.inscribed) ? activity.inscribed.filter(activity => activity.id !== id) : []
            }
        }).then(res => refetch())
    }

    const handleAdd = () => {
        setOpen(true)
    }

    const next = () => {
        if (validateForm()) {
            const previouslyInscribed = activity?.inscribed && Array.isArray(activity.inscribed) ? activity.inscribed : []
            firebase.upsertActivity({
                data: {
                    ...activity,
                    inscribed: [...previouslyInscribed, ...form[0].students.value]
                }
            }).then(res => refetch()).then(res => setOpen(false)).catch(error => console.log(error)).then(() => resetForm())
        }
    }


    const refetch = () => {
        firebase.getActivity({id: match.params.activity}).then(res => setActivity(res))
    }

    if (!match.params.activity || error) {
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
                history={history}
                addLink={content.addLink}
                data={activity?.inscribed || []}
                content={content}
                customDelete={handleDelete}
                refetch={refetch}
                handleAdd={handleAdd}
                role={appContext.user.role}
            />
            <InscriptionsModal open={open} setOpen={setOpen} next={next} form={form} updateForm={updateForm} students={students}/>
        </BasicContainer>
    );
}


export default compose(withRouter, withFirebase)(InscriptionsContainer)
