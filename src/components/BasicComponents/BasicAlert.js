import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    position: 'absolute',
    bottom: 25,
  },
}));

export default function BasicAlert({ open, handleAlert, text, severity }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grow in={open} xs={12} justify='flex-end'>
        <Alert
          severity={severity}
          variant='outlined'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                handleAlert({
                  open: false,
                  text: "",
                });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {text}
        </Alert>
      </Grow>
    </div>
  );
}
