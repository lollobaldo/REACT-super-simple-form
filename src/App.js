import React from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import {Form, Input, ErrorMessage, ErrorIcon, Validators} from './Form';

const validators = {
  name(value) {
    // console.log(value);
    if (value !== "ciao") {
      return Error("Error: Name must equal 'ciao'.");
    }
  },
  email: Validators.email,
}

const onSubmit = ({values, errors}, event) => {
  console.log(values);
}

function App() {
  return (
    <Form
      className="modal-form"
      // initialValues={}
      validators={validators}
      onSubmit={onSubmit}>
      <label htmlFor="name">Project name</label>
      <Input
        type="text"
        autoComplete="false"
        name="name"
        className="error"
        placeholder="Project Manager"
        required />
      <ErrorIcon
        name="name"
        iconRight={<FontAwesomeIcon icon={faCheck} className="icon-right" />}
        iconWrong={<FontAwesomeIcon icon={faTimes} className="icon-wrong" />} />
      <ErrorMessage name="name" />
      <label htmlFor="language">Programming language</label>
      <Input
        type="text"
        autoComplete="false"
        name="email"
        placeholder="Node.js" />
      <ErrorMessage name="email" />
      <div className="modal-form-clearfix">
        <input
          type="submit"
          className="btn-submit"
          value="Submit" />
      </div>
    </Form>
  );
}

export default App;
