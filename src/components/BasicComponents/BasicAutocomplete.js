import React, {memo} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from '@material-ui/core/Typography'

import _ from 'lodash'


const BasicAutocomplete = memo(
    ({label, value, mapperKey, dispatchValue, errorText, multiple = false, options = [], ...rest}) => {
        const [inputValue, setInputValue] = React.useState("");

        return (
           <>
               <Autocomplete
                   multiple={multiple}
                   error={!!errorText}
                   value={value}
                   noOptionsText="Sin opciones"
                   onChange={(event, newValue) => {
                       if (newValue) {
                           dispatchValue({
                               key: mapperKey,
                               value: multiple ? newValue : newValue?.id
                           });
                       } else {
                           dispatchValue({
                               key: mapperKey,
                               value: multiple ? [] : "",
                           });
                       }
                   }}
                   inputValue={inputValue}
                   onInputChange={(event, newInputValue) => {
                       setInputValue(newInputValue);
                   }}
                   filterSelectedOptions={multiple}
                   getOptionLabel={(option) => {
                       if (multiple === true) {
                           return option?.name || option
                       } else if (
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
                           return '';
                       }
                   }}
                   getOptionSelected={(option, value) => {
                       if(multiple === false) {
                           if (value === "") {
                               return true;
                           } else {
                               return value === option.id;
                           }
                       } else {
                           return _.isEqual(value, option)
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
               {errorText && <Typography color="error">{errorText}</Typography>}
           </>
        );
    }
);

export default BasicAutocomplete;
