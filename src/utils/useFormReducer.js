import { useReducer } from "react";

import validate from "validate.js";

const formValidation = ({ form, dispatchForm, validations }) => {
  let valid = true;
  for (let index = 0; index < form.length; index++) {
    const row = form[index];
    for (const key in row) {
      if (row.hasOwnProperty(key)) {
        const field = row[key];
        if (!field.valid) {
          const errors = validate.single(field.value, validations[key]);
          if (errors && errors.length > 0) {
            dispatchForm({
              type: "validateField",
              error: errors[errors.length - 1],
              index,
              key,
            });
            valid = false;
          }
        }
      }
    }

    return valid;
  }
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case "add":
      return [...prevState, action.instanceInitialState];
    case "delete":
      const filteredArr = Array.from(prevState);
      filteredArr.splice(action.index, 1);
      return filteredArr;
    case "update":
      const newState = Array.from(prevState);
      const errors = validate.single(
        action.value,
        action.validations[action.key]
      );
      let error =
        errors && errors.length > 0 ? errors[errors.length - 1] : null;

      const valid = error === null

      newState[action.index][action.key].error = error;
      newState[action.index][action.key].valid = valid;
      newState[action.index][action.key].value = action.value;

      return newState;

    case "reset":
      return action.resetState;

    case "set":
      return action.newState

    case "validateField":
      const validatedArr = Array.from(prevState);
      validatedArr[action.index][action.key].error = action.error;
      return validatedArr;

    default:
      return [...prevState];
  }
};

const useFormReducer = ({ initialState, validations }) => {
  const [form, dispatchForm] = useReducer(reducer, initialState);

  const validateForm = (customValidations) => {
    return formValidation({
      form,
      dispatchForm,
      validations: customValidations ? customValidations : validations,
    });
  };

  const getValues = () => {
    return form.map(child => {
      const reducedChild = {}

      for (const childKey in child) {
        if (child.hasOwnProperty(childKey)){
          reducedChild[childKey] = child[childKey].value
        }
      }

      return reducedChild
    })
  }

  const updateForm = ({ index, value, key }) => {
    dispatchForm({
      type: "update",
      index,
      key,
      value,
      validations,
    });
  };

  const resetForm = () => {
    dispatchForm({
      type: "reset",
      resetState: initialState,
    });
  };

  return [form, dispatchForm, { validateForm, updateForm, resetForm, getValues }];
};

export default useFormReducer;
