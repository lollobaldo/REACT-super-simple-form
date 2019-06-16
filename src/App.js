import React from 'react';
import './App.css';

import {Form, Input, ErrorMessage} from './Form';

const validators = {
  name(value) {
    console.log(value);
    if (value !== "ciao") {
      return ("name must equal 'ciao'");
    }
  },
  email(value) {
    if (!value || value.indexOf("@") === -1) {
      console.log(value.indexOf("@") === -1)
      return ("The email must contain '@'");
    }
  }
}

const onSubmit = ({errors, values}, event) => {
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
        name="name"
        className="error"
        placeholder="Project Manager"
        required />
      <ErrorMessage name="name" />
      <label htmlFor="language">Programming language</label>
      <Input
        type="text"
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
