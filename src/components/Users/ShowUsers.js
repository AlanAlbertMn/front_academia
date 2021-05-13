import React from "react";
//RootComponents
import { GET_USERS } from "../Queries/Queries";
import { DELETE_USER } from "../Mutations/Mutations";
import useMutationHelper from "../Mutations/UseMutationHelper";
import BasicTable from "../RootComponents/BasicTable";
import BasicLoading from "../RootComponents/BasicLoading";
import { columns, content } from "./ShowUsers.utils";
import { useQuery } from "@apollo/client";
import BasicContainer from "../RootComponents/BasicContainer";

const formatUsers = (data) => {
  return data.getUsers.map((user) => {
    return {
      ...user,
    };
  });
};

export default function ShowUsers({ history }) {
  const { data, loading } = useQuery(GET_USERS, {
    fetchPolicy: "network-only",
  });
  let users = [];

  const refetchQueries = [
    {
      query: GET_USERS,
    },
  ];

  const { executeMutation: deleteMutation } = useMutationHelper(DELETE_USER, {
    refetchQueries,
  });

  if (loading) {
    return <BasicLoading/>;
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
        deleteMutation={deleteMutation}
      />
    </BasicContainer>
  );
}
