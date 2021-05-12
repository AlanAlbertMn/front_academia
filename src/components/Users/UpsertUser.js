import { Grid, Typography } from "@material-ui/core";
import React, {  useState } from "react";
import BasicAutocomplete from "../RootComponents/BasicAutocomplete";
import BasicInput from "../RootComponents/BasicInput";
import BasicButton from "../RootComponents/BasicButton";
import useMutationHelper from "../Mutations/UseMutationHelper";
import { UPSERT_USER } from "../Mutations/Mutations";
import { GET_USERS } from "../Queries/Queries";
import useFormReducer from "../Utils/UseFormReducer";
import BasicAlert from '../RootComponents/BasicAlert'

import BasicContainer from "../RootComponents/BasicContainer";
import { useUpsertUserStyles } from "./UpsertUser.styles";

import { validations, roleOptions } from "./UpsertUser.utils";

export default function UpsertUser({ history }) {
  const [alert, handleAlert] = useState({
    open: false,
    text: "",
  });
  const [form, _dispatchForm, { updateForm, validateForm }] = useFormReducer({
    initialState: [
      {
        name: {
          value: "",
          valid: false,
          error: null,
        },
        email: {
          value: "",
          valid: false,
          error: null,
        },
        username: {
          value: "",
          valid: false,
          error: null,
        },
        role: {
          value: "CLIENT",
          valid: true,
          error: null,
        },
        password: {
          value: "",
          valid: false,
          error: null,
        },
      },
    ],
    validations,
  });

  const classes = useUpsertUserStyles();

  const dispatchValue = ({ key, value }) => {
    updateForm({ key, value, index: 0 });
  };

  const handleOnCompleted = () => {
    history.replace("/users");
  };

  const handleError = (error) => {
    handleAlert({
      open: true,
      text: "The user or email are already registered",
    });
  };

  const refetchQueries = [
    {
      query: GET_USERS,
    },
  ];

  const { executeMutation } = useMutationHelper(UPSERT_USER, {
    onCompletedFn: handleOnCompleted,
    onErrorFn: handleError,
    refetchQueries
  });

  const next = () => {
    const valid = validateForm();
    if (valid) {
      executeMutation({
        variables: {
          input: {
            role: form[0].role.value,
            username: form[0].username.value,
            password: form[0].password.value,
            name: form[0].name.value,
            email: form[0].email.value,
          },
        },
      });
    }
  };
  return (
    <BasicContainer justify='flex-start' alignContent='flex-start'>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h3">Create user</Typography>
      </Grid>
      <Grid item xs={12} className={classes.field}>
        <BasicInput
          label="Name"
          value={form[0].name.value}
          errorText={form[0].name.error}
          dispatchValue={dispatchValue}
          mapperKey="name"
        />
      </Grid>
      <Grid item xs={12} className={classes.field}>
        <BasicInput
          label="Username"
          value={form[0].username.value}
          errorText={form[0].username.error}
          dispatchValue={dispatchValue}
          mapperKey="username"
        />
      </Grid>
      <Grid item xs={12} className={classes.field}>
        <BasicInput
          label="Email"
          value={form[0].email.value}
          errorText={form[0].email.error}
          dispatchValue={dispatchValue}
          mapperKey="email"
        />
      </Grid>
      <Grid item xs={12} className={classes.field}>
        <BasicAutocomplete
          dispatchValue={dispatchValue}
          mapperKey="role"
          label="Role"
          value={form[0].role.value}
          errorText={form[0].role.error}
          options={roleOptions}
        />
      </Grid>
      <Grid item xs={12} className={classes.field}>
        <BasicInput
          label="Password"
          value={form[0].password.value}
          errorText={form[0].password.error}
          type="password"
          dispatchValue={dispatchValue}
          mapperKey="password"
        />
      </Grid>
      <Grid item xs={12} container justify="center" className={classes.title}>
        <BasicButton handleClick={next} fullWidth color="primary">
          Create user
        </BasicButton>
      </Grid>
      <BasicAlert
        open={alert.open}
        handleAlert={handleAlert}
        severity="error"
        text={alert.text}
      />
    </BasicContainer>
  );
}
