import React, { memo } from "react";

import { TextField, Typography } from "@material-ui/core";

const isNumeric = new RegExp("[0-9]+");

const BasicInput = memo(
  ({
    value,
    dispatchValue,
    name,
    maxLength,
    errorText,
    label,
    mapperKey,
    placeholder = "",
    type = "text",
    ...rest
  }) => {
    const handleChange = (event) => {
      if (type === "numerical") {
        const isNewValueNumeric = isNumeric.test(event.key);
        if (!isNewValueNumeric) {
          event.preventDefault();
        }
        if (isNewValueNumeric) {
          dispatchValue({
            name,
            value: event.target.value,
            key: mapperKey,
          });
        }
      } else {
        dispatchValue({
          name,
          value: event.target.value,
          key: mapperKey,
        });
      }
    };
    const error = errorText ? true : false;

    return (
      <>
        <TextField
          variant="outlined"
          value={value}
          name={name}
          error={error}
          label={label}
          placeholder={placeholder}
          onKeyPress={handleChange}
          onChange={(event) => {
            if (maxLength && event.target.value?.length > maxLength) {
              event.preventDefault();
            } else {
              dispatchValue({ key: mapperKey, value: event.target.value });
            }
          }}
          fullWidth
          type={type}
          {...rest}
        />
        {errorText && <Typography color="error">{errorText}</Typography>}
      </>
    );
  }
);

export default BasicInput;
