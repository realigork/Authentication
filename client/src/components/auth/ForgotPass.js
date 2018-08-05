import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ForgotPass extends Component {
  onSubmit = (formProps) => {
    this.props.forgotPass(formProps);
  }

  showResetLink = () => {
    const resetUrl = `/reset-pass?rt=${this.props.resetToken}&e=${this.props.email}`;
    return (
      <p>
        To reset password <Link to={resetUrl}>click here</Link>
      </p>
    )
  }

  render() {
    const { handleSubmit, noUser } = this.props;
    const resetPass = this.props.resetToken ? this.showResetLink() : null;
    return (
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

        <div>
          {noUser}
          {resetPass}
        </div>

        <button>Recover</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    noUser: state.auth.errorMsg,
    resetToken: state.auth.resetToken,
    email: state.auth.email
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'forgot-pass' })
)(ForgotPass);