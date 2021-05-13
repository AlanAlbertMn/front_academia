import React from "react";

import { Container } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { deepPurple } from "../../utils/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 700,
    height: '100vh',
    maxHeight: "auto",
    padding: "100px 50px 100px 50px",
    zIndex: "-1",
  },
  rootSm: {
    minHeight: 530,
    height: "100vh",
    maxHeight: "auto",
    padding: "15px 15px 15px 15px",
    zIndex: "-1",
  },
  parent: {
    height: "100%",
    backgroundColor: deepPurple,
    minHeight: 400,
  },
}));

const BasicContainer = ({ children, alignContent="center", justify="center" }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const classes = useStyles();
  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      className={matches ? classes.root : classes.rootSm}
    >
      <Grid
        container
        alignContent={alignContent}
        justify="center"
        className={classes.parent}
      >
        {children}
      </Grid>
    </Container>
  );
};

export default BasicContainer;
