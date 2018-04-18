import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setPaymentFormError,
  changePaymentFormData,
  deletePaymentFormError,
} from 'actions/paymentForm';

import { Input } from 'components/common';

import { helpers } from 'utils';
import styles from '../PaymentForm.scss';


class CreateAccount extends Component {

  static propTypes = {
    email: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    password: PropTypes.string.isRequired,

    setPaymentFormError: PropTypes.func.isRequired,
    changePaymentFormData: PropTypes.func.isRequired,
    deletePaymentFormError: PropTypes.func.isRequired,
    onValidateRequiredField: PropTypes.func.isRequired,
  }

  handleEmailValidate = (value, name) => {
    const { setPaymentFormError, deletePaymentFormError } = this.props;

    helpers.emailValidate(value)
      ? deletePaymentFormError(name)
      : setPaymentFormError(name, 'Email not valid');
  }

  render() {
    const {
      email,
      errors,
      password,
      changePaymentFormData,
      onValidateRequiredField,
    } = this.props;

    return (
      <Fragment>
        <div className={styles.title}>
          Create account
        </div>
        <div className={styles.row}>
          <div className={styles.col50}>
            <Input
              white
              name="email"
              value={email}
              error={errors.email}
              title="Email address"
              onChange={changePaymentFormData}
              onValidate={this.handleEmailValidate}
            />
          </div>
          <div className={styles.col50}>
            <Input
              name="password"
              value={password}
              type="password"
              title="Password"
              error={errors.password}
              onChange={changePaymentFormData}
              onValidate={onValidateRequiredField}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = state => ({
  errors: state.paymentForm.errors,
  email: state.paymentForm.data.email,
  password: state.paymentForm.data.password,
});

const mapDispatchToProps = {
  setPaymentFormError,
  changePaymentFormData,
  deletePaymentFormError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount);
