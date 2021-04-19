import React from "react";
import { Button } from "@material-ui/core";

const BasicButton = ({
  handleClick,
  variant = "contained",
  fullWidth = false,
  children,
  type = "button",
  ...rest
}) => {
  const decideAction = (event) => {
    if (type === "button") {
      handleClick(event);
    }
  };

  return (
    <Button
      onClick={decideAction}
      variant={variant}
      fullWidth={fullWidth}
      type={type}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default BasicButton;
