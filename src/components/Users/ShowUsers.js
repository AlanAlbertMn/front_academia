import React from "react";
//RootComponents
import BasicTable from "../BasicComponents/BasicTable";
import BasicLoading from "../BasicComponents/BasicLoading";
import { columns, content } from "./ShowUsers.util";
import BasicContainer from "../BasicComponents/BasicContainer";

const formatUsers = (data) => {
    return data.getUsers.map((user) => {
        return {
            ...user,
        };
    });
};

export default function ShowUsers({ history }) {

    let users = [];

    const usersFire = db.collection('users');
    const snapshot = usersFire.get();
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    });

    if (loading) {
        return <BasicLoading />;
    }

    if (data) {
        users = formatUsers(data);
    }
    return (
        <BasicContainer>
            <BasicTable
                columns={columns}
                title={content.title}
                history={history}
                addLink={content.addLink}
                data={users}
                content={content}
            />
        </BasicContainer>
    );
}
