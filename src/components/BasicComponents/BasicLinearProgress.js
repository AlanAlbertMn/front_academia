import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box minWidth={170}>
        <Typography variant="body2" color="textSecondary">Loading next update...</Typography>
      </Box>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const useStyles = makeStyles({
  root: {
    width: "90%",
  },
});

export default function BasicLinearProgress({
  progress,
  setProgress,
  timeout = 600,
}) {
  const classes = useStyles();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      );
    }, timeout);
    return () => {
      clearInterval(timer);
    };
  }, [setProgress, timeout]);

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
}
