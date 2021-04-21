//signup #4
import React, { useReducer } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
//RootComponents
import BasicInput from "../BasicComponents/BasicInput";
import BasicButton from "../BasicComponents/BasicButton";
import { userSignUp, passwordSignUp, email } from "../../utils/validations";
import { makeStyles } from "@material-ui/core/styles";

const validate = require("validate.js");

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  container: {
    height: "100%",
  },
});

const constraints = {
  user: userSignUp,
  password: passwordSignUp,
  email,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.name]: {
          value: action.value,
          errors: validate.single(action.value, constraints[action.name]),
        },
      };
    case "validate":
      const newState = { ...state };
      for (const key in newState) {
        if (newState.hasOwnProperty(key)) {
          const field = newState[key];
          field.errors = validate.single(field.value, constraints[key]);
        }
      }
      return newState;
    default:
      return {
        ...state,
      };
  }
};

const calculateTotalErrors = ({ form }) => {
  let acum = 0;
  for (const key in form) {
    if (form.hasOwnProperty(key)) {
      const field = form[key];
      acum += field.errors ? field.errors.length : 0;
    }
  }

  return acum;
};

const parseErrors = (errors) => {
  if (errors && errors.length > 0) {
    return errors[errors.length - 1];
  } else {
    return "";
  }
};

const SignUp = (props) => {
  const [form, dispatchForm] = useReducer(formReducer, {
    user: {
      value: "",
      errors: null,
    },
    email: {
      value: "",
      errors: null
    },
    password: {
      value: "",
      errors: null,
    },
  });

  const handleLogin = () => {
    props.history.push('/login')
  }

  const classes = useStyles();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatchForm({ type: "validate" });
    if (calculateTotalErrors({ form }) === 0) {
      props.history.push('/login')
    } else {
      console.log("HUBO UN ERROR");
    }
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <Container fixed className={classes.root}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Grid container item xs={4} spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4">Registro</Typography>
            </Grid>
            <BasicInput
              value={form.user.value}
              dispatchValue={dispatchForm}
              errorText={parseErrors(form.user.errors)}
              label="Usuario"
              name="user"
            />
            <BasicInput
              value={form.email.value}
              dispatchValue={dispatchForm}
              errorText={parseErrors(form.email.errors)}
              label="Mail"
              name="email"
            />
            <BasicInput
              value={form.password.value}
              dispatchValue={dispatchForm}
              errorText={parseErrors(form.password.errors)}
              label="Contraseña"
              name="password"
              type="password"
            />
            <BasicButton type="submit" fullWidth={true}>
              Registrarme
            </BasicButton>
            <BasicButton type="button" handleClick={handleLogin} fullWidth={true}>
              Iniciar sesión
            </BasicButton>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default SignUp;
