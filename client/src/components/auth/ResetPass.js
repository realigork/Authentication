import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ResetPass extends Component {
  state = {
    confirmPassError: ''
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

  onSubmit = (formProps) => {
    // compare and validate password
    const { password, confirmPassword } = formProps;
    if (password !== confirmPassword) {
      return this.setState({ confirmPassError: 'Passwords do not match!' })
    }

    const user = {
      email: this.getParameterByName('e'),
      password: password
    }

    // store new hashed password
    // redirect to home
    this.props.resetPass(user, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const errorMsg = this.state.confirmPassError;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Password:</label>
          <Field name="password" type="password" component="input" autoComplete="none" />
        </fieldset>

        <fieldset>
          <label>Confirm Password:</label>
          <Field name="confirmPassword" type="password" component="input" autoComplete="none" />
        </fieldset>

        <div>
          {errorMsg}
        </div>

        <button>Reset</button>
      </form>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'reset-pass' })
)(ResetPass);