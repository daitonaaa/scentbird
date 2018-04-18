import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment, Component } from 'react';

import {
  setPaymentFormError,
  changePaymentFormData,
  deletePaymentFormError,
} from 'actions/paymentForm';

import { Input, Select } from 'components/common';

import { helpers } from 'utils';
import styles from '../PaymentForm.scss';


class CreditCard extends Component {

  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    errors: PropTypes.object.isRequired,
    creditCard: PropTypes.string.isRequired,
    securityCode: PropTypes.string.isRequired,

    setPaymentFormError: PropTypes.func.isRequired,
    changePaymentFormData: PropTypes.func.isRequired,
    deletePaymentFormError: PropTypes.func.isRequired,
    onValidateRequiredField: PropTypes.func.isRequired,
  };

  handleCardValidate = (value, name) => {
    const { setPaymentFormError, deletePaymentFormError } = this.props;
    const validate = helpers.cardValid(value);

    validate
      ? deletePaymentFormError(name)
      : setPaymentFormError(name, 'Card not valid');
  }

  handleSecurityCodeValidate = (value, name) => {
    const { setPaymentFormError, deletePaymentFormError } = this.props;
    const validate = value !== '111';
    const code = value.trim();

    validate && code
      ? deletePaymentFormError(name)
      : setPaymentFormError(
        name,
        code ? 'Security code not valid' : 'This field is required'
      );
  }

  render() {
    const {
      year,
      month,
      errors,
      creditCard,
      securityCode,
      changePaymentFormData,
      onValidateRequiredField,
    } = this.props;

    return (
      <Fragment>
        <div className={styles.title}>
          Secure credit card payment
        </div>
        <div className={styles.cardBox}>
          <div className={styles.cardTop}>
            <div className={styles.cardSafe}>
              128-bit encryption you're safe
            </div>
            <div className={styles.cardIcons} />
          </div>
          <div className={styles.cardFlex}>
            <div className={styles.cardNumber}>
              <Input
                white
                name="creditCard"
                value={creditCard}
                title="Credit card number"
                error={errors.creditCard}
                mask="0000  0000  0000  0000"
                onChange={changePaymentFormData}
                onValidate={this.handleCardValidate}
                icon={<div className={styles.cardNumberIcon} />}
              />
            </div>
            <div className={styles.cardSecurity}>
              <Input
                white
                name="securityCode"
                value={securityCode}
                title="Security code"
                error={errors.securityCode}
                onChange={changePaymentFormData}
                onValidate={this.handleSecurityCodeValidate}
              />
              <div className={styles.cardHelp}>
                ?
              </div>
            </div>
            <div className={styles.cardDates}>
              <div className={styles.cardDate}>
                <Select
                  white
                  options={[
                    { value: 5, label: '05' },
                    { value: 6, label: '06' },
                  ]}
                  name="month"
                  value={month}
                  title="Month"
                  error={errors.month}
                  onChange={changePaymentFormData}
                  onValidate={onValidateRequiredField}
                />
              </div>
              <div className={`${styles.cardDate} ${styles.cardDateRight}`}>
                <Select
                  white
                  options={[
                    { value: 18, label: '18' },
                    { value: 19, label: '19' },
                  ]}
                  name="year"
                  value={year}
                  title="Year"
                  error={errors.year}
                  onChange={changePaymentFormData}
                  onValidate={onValidateRequiredField}
                />
              </div>
              <div className={styles.cardDate}>
                <span>Exp.</span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = state => ({
  errors: state.paymentForm.errors,
  year: state.paymentForm.data.year,
  month: state.paymentForm.data.month,
  creditCard: state.paymentForm.data.creditCard,
  securityCode: state.paymentForm.data.securityCode,
});

const mapDispatchToProps = {
  setPaymentFormError,
  changePaymentFormData,
  deletePaymentFormError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCard);
