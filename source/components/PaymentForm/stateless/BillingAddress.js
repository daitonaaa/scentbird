import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changePaymentFormData } from 'actions/paymentForm';

import { Input } from 'components/common';

import styles from '../PaymentForm.scss';


const BillingAddress =  ({
  errors,
  billingApt,
  billingCity,
  billingStreet,
  billingRegion,
  billingCountry,
  billingPostCode,
  changePaymentFormData,
  onValidateRequiredField,
}) => (
  <Fragment>
    <div className={styles.title}>
      Billing address
    </div>
    <div className={styles.row}>
      <div className={styles.col66}>
        <Input
          name="billingStreet"
          value={billingStreet}
          title="Street address"
          error={errors.billingStreet}
          onChange={changePaymentFormData}
          onValidate={onValidateRequiredField}
        />
      </div>
      <div className={styles.col33}>
        <Input
          name="billingApt"
          value={billingApt}
          title="Apt/Suite (Optional)"
          onChange={changePaymentFormData}
        />
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.col33}>
        <Input
          name="billingPostCode"
          value={billingPostCode}
          title="Post code"
          error={errors.billingPostCode}
          onChange={changePaymentFormData}
          onValidate={onValidateRequiredField}
        />
      </div>
      <div className={styles.col33}>
        <Input
          name="billingCity"
          value={billingCity}
          title="City"
          error={errors.billingCity}
          onChange={changePaymentFormData}
          onValidate={onValidateRequiredField}
        />
      </div>
      <div className={styles.col33}>
        <Input
          name="billingRegion"
          value={billingRegion}
          title="Region"
          error={errors.billingRegion}
          onChange={changePaymentFormData}
          onValidate={onValidateRequiredField}
        />
      </div>
    </div>
    <div className={styles.row}>
      <Input
        name="billingCountry"
        value={billingCountry}
        title="Country"
        error={errors.billingCountry}
        onChange={changePaymentFormData}
        onValidate={onValidateRequiredField}
      />
    </div>
  </Fragment>
);


BillingAddress.propTypes = {
  errors: PropTypes.object.isRequired,
  billingApt: PropTypes.string.isRequired,
  billingCity: PropTypes.string.isRequired,
  billingStreet: PropTypes.string.isRequired,
  billingRegion: PropTypes.string.isRequired,
  billingCountry: PropTypes.string.isRequired,
  billingPostCode: PropTypes.string.isRequired,

  changePaymentFormData: PropTypes.func.isRequired,
  onValidateRequiredField: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.paymentForm.errors,
  billingApt: state.paymentForm.data.billingApt,
  billingCity: state.paymentForm.data.billingCity,
  billingStreet: state.paymentForm.data.billingStreet,
  billingRegion: state.paymentForm.data.billingRegion,
  billingCountry: state.paymentForm.data.billingCountry,
  billingPostCode: state.paymentForm.data.billingPostCode,
});

const mapDispatchToProps = {
  changePaymentFormData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingAddress);
