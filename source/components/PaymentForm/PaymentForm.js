import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

import {
  resetPaymentForm,
  submitPaymentForm,
  setPaymentFormError,
  deletePaymentFormError,
  changePaymentFormBillingStatus,
} from 'actions/paymentForm';

import {
  CreditCard,
  CreateAccount,
  BillingAddress,
  ShippingAddress,
} from './stateless';

import url from 'urls';
import styles from './PaymentForm.scss';


export class PaymentForm extends Component {

  static propTypes = {
    billingAddress: PropTypes.bool.isRequired,

    resetPaymentForm: PropTypes.func.isRequired,
    submitPaymentForm: PropTypes.func.isRequired,
    setPaymentFormError: PropTypes.func.isRequired,
    deletePaymentFormError: PropTypes.func.isRequired,
    changePaymentFormBillingStatus: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    this.props.resetPaymentForm();
  }

  handleChangeBillingAddressStatus = event => {
    const { changePaymentFormBillingStatus } = this.props;

    changePaymentFormBillingStatus(event.target.checked);
  }

  handleRequiredField = (value, name) => {
    const { setPaymentFormError, deletePaymentFormError } = this.props;
    const processedValue = typeof value === 'number' ? value : value.trim();

    processedValue
      ? deletePaymentFormError(name)
      : setPaymentFormError(name, 'This field is required');
  }

  renderBillingAddress() {
    const { billingAddress } = this.props;

    if (!billingAddress) return (
      <BillingAddress onValidateRequiredField={this.handleRequiredField} />
    );
  }

  render() {
    const { billingAddress, submitPaymentForm } = this.props;

    const prop = {
      onValidateRequiredField: this.handleRequiredField
    };

    return (
      <Fragment>
        <CreateAccount {...prop} />
        <ShippingAddress {...prop} />
        <div className={styles.rowBlock}>
          <div className="checkbox-white checkbox-margin-right">
            <input
              type="checkbox"
              id="billingAddress"
              checked={billingAddress}
              onChange={this.handleChangeBillingAddressStatus}
            />
            <label htmlFor="billingAddress" />
            <label htmlFor="billingAddress">
              Use this address as my billing address
            </label>
          </div>
        </div>
        {this.renderBillingAddress()}
        <CreditCard {...prop} />
        <div className={styles.bottom}>
          <Link to={url.product}>
            Back
          </Link>
          <div
            onClick={submitPaymentForm}
            className={styles.bottomBtn}
          >
            buy now
          </div>
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = state => ({
  billingAddress: state.paymentForm.billingAddress,
});

const mapDispatchToProps = {
  resetPaymentForm,
  submitPaymentForm,
  setPaymentFormError,
  deletePaymentFormError,
  changePaymentFormBillingStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm);
