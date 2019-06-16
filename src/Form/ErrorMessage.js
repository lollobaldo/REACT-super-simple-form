import React from 'react';
import PropTypes from 'prop-types';
import {FormConsumer} from "./Form";

const _extractErrorObject = (error) => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return false;
  }
};

const ErrorMessage = ({name, ...rest}) => (
  <FormConsumer>
    {({errors}) => {
      const errorMessage = errors[name];
      return (
        errorMessage
          ? <p className="error-message" {...rest}>{errorMessage}</p>
          : null
      );
    }}
  </FormConsumer>
);

ErrorMessage.propTypes = {
    name: PropTypes.string.isRequired
};

export default ErrorMessage;
