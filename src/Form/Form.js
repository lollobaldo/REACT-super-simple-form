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
    this.state = {
      values: props.defaultValues,
      errors: {}
    };
  }

  handleInputChange(event) {
    const values = this.state.values;
    const target = event.target.name

    this.setState({
      values: {
        ...values,
        [target]: event.target.value,
      }
    }, () => {
      if (this.state.errors[target]) {
        this._validate(target);
      }});
  }

  handleInputBlur(event) {
    // console.log("about to validate " + event.target.name);
    this._validate(event.target.name);
  }

  _validate (input) {
    // console.log("validating");
    const value = this.state.values[input];
    const error = this.props.validators[input](value, this.state.values);
    const errors = this.state.errors;
    this.setState({
      errors: {
        ...errors,
        [input]: error,
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