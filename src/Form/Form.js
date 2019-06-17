import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ValuesContext = React.createContext({});
const ErrorsContext = React.createContext({});
const SetValueContext = React.createContext(() => {});

export const FormConsumer = ({ children }) => {
  return (
    <ErrorsContext.Consumer>
      {(errors) => (
        <ValuesContext.Consumer>
          {(values) => (
            <SetValueContext.Consumer>
              {({handleInputChange, handleInputBlur}) => 
                children({
                  errors,
                  values,
                  handleInputChange,
                  handleInputBlur,})}
            </SetValueContext.Consumer>
          )}
        </ValuesContext.Consumer>
      )}
    </ErrorsContext.Consumer>
  );
};

class Form extends Component {
  constructor (props) {
    super(props);
    let values = {};
    for (const key in props.defaultValues.keys) {
      values[key] = {
        touched: true,
        value: props.defaultValues[key],
      }
    }
    this.state = {
      values: values,
      errors: {},
    };
  }

  handleInputChange(event) {
    const values = this.state.values;
    const name = event.target.name;

    this.setState({
      values: {
        ...values,
        [name]: {
          touched: values[name] && values[name].touched,
          value: event.target.value,
        }
      }
    }, () => {
      if (this.state.errors[name] && this.state.errors[name].message) {
        this._validate(name);
    }});
  }

  handleInputBlur(event) {
    const values = this.state.values;
    const name = event.target.name;
    this.setState({
      values: {
        ...values,
        [name]: {
          touched: this.state.values[name],
          value: event.target.value,
        }
      }
    })
    this._validate(event.target.name);
  }

  _validate (name) {
    // console.log("validating");
    const value = this.state.values[name].value;
    const error = this.props.validators[name](value, this.state.values);
    const errors = this.state.errors;
    // console.log(error);
    this.setState({
      errors: {
        ...errors,
        [name]: {
          isError: error instanceof Error,
          message: error instanceof Error ? error.message : error
        },
      }
    });
  }

  _onSubmit (event) {
    event.preventDefault();
    const values = this.state.values;
    const errors = this._validate();
    this.setState({errors});
    this.props.onSubmit({errors, values}, event);
  }

  render () {
    const {
      // eslint-disable-next-line no-unused-vars
      validator, onSubmit, defaultValues,
      children,
      ...rest
    } = this.props;

    return (
      <ValuesContext.Provider value={this.state.values}>
        <ErrorsContext.Provider value={this.state.errors}>
          <SetValueContext.Provider value={{
            handleInputChange: this.handleInputChange.bind(this),
            handleInputBlur: this.handleInputBlur.bind(this)}}>
            <form
              onSubmit={this._onSubmit.bind(this)} {...rest}>
                {children}
            </form>
          </SetValueContext.Provider>
        </ErrorsContext.Provider>
      </ValuesContext.Provider>
    )
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  validators: PropTypes.object,
  defaultValues: PropTypes.object,
  children: PropTypes.any,
};

Form.defaultProps = {
  validators: () => {},
  onSubmit: () => {},
  defaultValues: {}
};

FormConsumer.propTypes = {
  children: PropTypes.any,
}

export default Form;