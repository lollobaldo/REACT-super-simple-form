import React from 'react';
import PropTypes from 'prop-types';
import {FormConsumer} from "./Form";

const ErrorMessage = ({name, ...rest}) => (
  <FormConsumer>
    {({errors}) => {
      const error = errors[name];
      return (
        error ?
          <p
            className={`${error.isError ? "error" : "warning"}-message`}
            {...rest}>
              {error.message}
            </p> : null
      );
    }}
  </FormConsumer>
);

ErrorMessage.propTypes = {
    name: PropTypes.string.isRequired
};

export default ErrorMessage;
