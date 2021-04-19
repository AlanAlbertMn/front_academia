import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
export default function BasicCheckbox({ label, value, dispatchValue, mapperKey }) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(event) =>
            dispatchValue({ key: mapperKey, value: event.target.checked })
          }
          name="checkedB"
          color="primary"
        />
      }
      label={label}
    />
  );
}
