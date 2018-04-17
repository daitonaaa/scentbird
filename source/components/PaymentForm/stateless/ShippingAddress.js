import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changePaymentFormData } from 'actions/paymentForm';

import { Input } from 'components/common';

import styles from '../PaymentForm.scss';


const ShippingAddress =  ({
  phone,
  lastName,
  firstName,
  shippingApt,
  shippingCity,
  shippingStreet,
  shippingRegion,
  shippingCountry,
  shippingPostCode,
  changePaymentFormData
}) => (
  <Fragment>
    <div className={styles.title}>
      Shipping address
    </div>
    <div className={styles.row}>
      <div className={styles.col50}>
        <Input
          name="firstName"
          value={firstName}
          title="First name"
          onChange={changePaymentFormData}
        />
      </div>
      <div className={styles.col50}>
        <Input
          name="lastName"
          value={lastName}
          title="Last name"
          onChange={changePaymentFormData}
        />
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.col66}>
        <Input
          name="shippingStreet"
          value={shippingStreet}
          title="Street address"
          onChange={changePaymentFormData}
        />
      </div>
      <div className={styles.col33}>
        <Input
          name="shippingApt"
          value={shippingApt}
          title="Apt/Suite (Optional)"
          onChange={changePaymentFormData}
        />
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.col33}>
        <Input
          name="shippingPostCode"
          value={shippingPostCode}
          title="Post code"
          onChange={changePaymentFormData}
        />
      </div>
      <div className={styles.col33}>
        <Input
          name="shippingCity"
          value={shippingCity}
          title="City"
          onChange={changePaymentFormData}
        />
      </div>
      <div className={styles.col33}>
        <Input
          name="shippingRegion"
          value={shippingRegion}
          title="Region"
          onChange={changePaymentFormData}
        />
      </div>
    </div>
    <div className={styles.row}>
      <Input
        name="shippingCountry"
        value={shippingCountry}
        title="Country"
        onChange={changePaymentFormData}
      />
    </div>
    <div className={styles.row}>
      <div className={styles.col50}>
        <Input
          name="phone"
          value={phone}
          title="Mobile number (Optional)"
          onChange={changePaymentFormData}
        />
      </div>
      <div className={styles.col50}>
        <span>We may send you special discounts and offers</span>
      </div>
    </div>
  </Fragment>
);


ShippingAddress.propTypes = {
  phone: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  shippingApt: PropTypes.string.isRequired,
  shippingCity: PropTypes.string.isRequired,
  shippingStreet: PropTypes.string.isRequired,
  shippingRegion: PropTypes.string.isRequired,
  shippingCountry: PropTypes.string.isRequired,
  shippingPostCode: PropTypes.string.isRequired,

  changePaymentFormData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  phone: state.paymentForm.data.phone,
  lastName: state.paymentForm.data.lastName,
  firstName: state.paymentForm.data.firstName,
  shippingApt: state.paymentForm.data.shippingApt,
  shippingCity: state.paymentForm.data.shippingCity,
  shippingStreet: state.paymentForm.data.shippingStreet,
  shippingRegion: state.paymentForm.data.shippingRegion,
  shippingCountry: state.paymentForm.data.shippingCountry,
  shippingPostCode: state.paymentForm.data.shippingPostCode,
});

const mapDispatchToProps = {
  changePaymentFormData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingAddress);
