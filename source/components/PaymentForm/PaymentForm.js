import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import { resetPaymentForm, setPaymentFormBillingStatus } from 'actions/paymentForm';

import { CreateAccount, ShippingAddress } from './stateless';

import styles from './PaymentForm.scss';


export class PaymentForm extends Component {

  static propTypes = {
    billingAddress: PropTypes.bool.isRequired,

    resetPaymentForm: PropTypes.func.isRequired,
    setPaymentFormBillingStatus: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.resetPaymentForm();
  }

  handleChangeBillingAddressStatus = event => {
    const { setPaymentFormBillingStatus } = this.props;

    setPaymentFormBillingStatus(event.target.checked);
  }

  render() {
    const { billingAddress } = this.props;

    return (
      <Fragment>
        <div className={styles.head}>
          <h1>MONTH-TO-MONTH SUBSCRIPTION</h1>
          <span>Billed monthly. Renews automatically, cancel any time. Free shipping.</span>
        </div>
        <CreateAccount />
        <ShippingAddress />
        <div className={styles.rowBlock}>
          <div className="checkbox-white checkbox-margin-right">
            <input
              type="checkbox"
              id="billingAddress"
              checked={billingAddress}
              onChange={this.handleChangeBillingAddressStatus}
            />
            <label htmlFor="billingAddress" />
            <label htmlFor="billingAddress">Use this address as my billing address</label>
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
  setPaymentFormBillingStatus,
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(PaymentForm);
