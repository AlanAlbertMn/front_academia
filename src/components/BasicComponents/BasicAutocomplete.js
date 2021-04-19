import React, { memo } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const BasicAutocomplete = memo(
  ({ label, value, mapperKey, dispatchValue, options = [], ...rest }) => {
    const [inputValue, setInputValue] = React.useState("");

    return (
      <Autocomplete
        value={value}
        noOptionsText="Sin opciones"
        onChange={(event, newValue) => {
          if (newValue) {
            dispatchValue({
              key: mapperKey,
              value: newValue?.id,
            });
          } else {
            dispatchValue({
              key: mapperKey,
              value: "",
            });
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => {
          if (
            option !== null &&
            option !== "" &&
            typeof option !== "object" &&
            options !== null &&
            Array.isArray(options) &&
            options.length > 0
          ) {
            return options.find((element) => element.id === option).name;
          } else if (
            option !== null &&
            option !== "" &&
            typeof option === "object"
          ) {
            return option.name;
          } else {
            return "";
          }
        }}
        getOptionSelected={(option, value) => {
          if (value === "") {
            return true;
          } else {
            return value === option.id;
          }
        }}
        fullWidth={true}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" {...rest} />
        )}
        disableClearable={true}
        {...rest}
      />
    );
  }
);

export default BasicAutocomplete;
