import React from 'react';
import PropTypes from "prop-types";
import {FormConsumer} from "./Form";

const Input = ({
  name,
  ...rest}) => (
  <FormConsumer>
    {({values, handleInputChange, handleInputBlur}) => {
      return (
        <input
          name={name}
          value={values[name] || ""}
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
