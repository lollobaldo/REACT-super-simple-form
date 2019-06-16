import React from 'react';
import './App.css';

import {Form, Input, ErrorMessage} from './Form';

const validator = (values) => {
  return {};
}

const onSubmit = ({errors, values}, event) => {
  console.log(values);
}

function App() {
  return (
    <Form
      className="modal-form"
      // initialValues={}
      validator={validator}
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
        name="language"
        placeholder="Node.js" />
      <ErrorMessage
        name="language"
        className="error"
        component="div" />
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
