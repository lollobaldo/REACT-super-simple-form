import React from 'react';
import PropTypes from "prop-types";
import {FormConsumer} from "./Form";

const Input = ({
  name,
  classNames,
  ...rest}) => (
  <FormConsumer>
    {({errors, values, handleInputChange, handleInputBlur}) => {
      if (rest.type === "submit") {
        return (
          <input disabled={errors.allClear} className={classNames} {...rest} />
        )
      }
      const touched = values[name] && values[name].touched;
      const isError = errors[name] && errors[name].message;
      return (
        <input
          name={name}
          value={(values[name] && values[name].value) || ""}
          className={classNames +
            touched ? (isError ? "input-wrong" : "input-right") : null
          }
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          {...rest} />
      );
    }}
  </FormConsumer>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Input;
