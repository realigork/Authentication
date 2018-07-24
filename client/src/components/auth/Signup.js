import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  onSubmit = (formProps) => {
    this.props.authUser(formProps);
  };

  render() {
    // get it from reduxForm
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email:</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>

        <fieldset>
          <label>Password:</label>
          <Field name="password" type="password" component="input" autoComplete="none" />
        </fieldset>
        <button>Sign up</button>
      </form>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'signup' })
)(Signup)