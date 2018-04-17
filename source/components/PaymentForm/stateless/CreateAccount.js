import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changePaymentFormData } from 'actions/paymentForm';

import { Input } from 'components/common';

import styles from '../PaymentForm.scss';


const CreateAccount =  ({ password, email, changePaymentFormData }) => (
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
          title="Email address"
          onChange={changePaymentFormData}
        />
      </div>
      <div className={styles.col50}>
        <Input
          name="password"
          value={password}
          type="password"
          title="Password"
          onChange={changePaymentFormData}
        />
      </div>
    </div>
  </Fragment>
);


CreateAccount.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,

  changePaymentFormData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  email: state.paymentForm.data.email,
  password: state.paymentForm.data.password,
});

const mapDispatchToProps = {
  changePaymentFormData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount);
