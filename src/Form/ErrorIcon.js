import React from 'react';
import PropTypes from 'prop-types';
import {FormConsumer} from "./Form";

const ErrorIcon = ({name, iconRight, iconWrong, ...rest}) => (
  <FormConsumer>
    {({values, errors}) => {
      const touched = values[name] && values[name].touched;
      const isError = errors[name] && errors[name].message;
      return (
        touched ? (isError ? iconWrong : iconRight) : null
      );
    }}
  </FormConsumer>
);

ErrorIcon.propTypes = {
    name: PropTypes.string.isRequired,
    iconRight: PropTypes.element.isRequired,
    iconWrong: PropTypes.element.isRequired,
};

export default ErrorIcon;
