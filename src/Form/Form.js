import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ValuesContext = React.createContext({});
const ErrorsContext = React.createContext({});
const SetValueContext = React.createContext(() => {});

export const FormConsumer = ({ children }) => {
  return (
    <ErrorsContext.Consumer>
      {errors => (
        <ValuesContext.Consumer>
          {values => (
            <SetValueContext.Consumer>
              {handleInputChange => children({errors, values, handleInputChange})}
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
    this.setState({
      values: {
        ...values,
        [event.target.name]: event.target.value,
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

  _validate () {
    let errors = this.props.validator(this.state.values);
    // errors = errors.filter(e => !!e); // Filter not-empty errors
    return Object.keys(errors).length > 0 ? errors : {};
    // return {};
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
          <SetValueContext.Provider value={this.handleInputChange.bind(this)}>
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
  children: PropTypes.any,
  validator: PropTypes.func,
  onSubmit: PropTypes.func,
  defaultValues: PropTypes.object
};

Form.defaultProps = {
  validator: () => {},
  onSubmit: () => {},
  defaultValues: {}
};

FormConsumer.propTypes = {
  children: PropTypes.any,
}

export default Form;