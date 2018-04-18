import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';

import { getProductInfo } from 'actions/productInfo';

import ProductInfo from 'components/ProductInfo';
import PaymentForm from 'components/PaymentForm';

import styles from './Product.scss';


export class Product extends Component {

  static propTypes = {
    getProductInfo: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getProductInfo();
  }

  render() {
    return (
      <div className={styles.product}>
        <Helmet>
          <title>SCENTBRID</title>
        </Helmet>
        <div className={styles.productHead}>
          <h1>MONTH-TO-MONTH SUBSCRIPTION</h1>
          <span>Billed monthly. Renews automatically, cancel any time. Free shipping.</span>
        </div>
        <div className={styles.productInfo}>
          <ProductInfo />
        </div>
        <div className={styles.productPayment}>
          <PaymentForm />
        </div>
        <div className={styles.productBottom}>
          <img src="http://test2.ortuna.ru/leftBg.jpg" alt="image" />
          <span>
            You will receive an email confirmation when recipient accepts your gift. 
            Scentbird ships between the 15th and the 18th of every month. Recipient 
            will receive an email confirmation of shipment every month. Please allow 
            5-7 days for delivery.
          </span>
        </div>
      </div>
    );
  }
}


export default connect(
  () => ({}),
  { getProductInfo }
)(Product);
