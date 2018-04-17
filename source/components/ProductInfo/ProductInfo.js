import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import React, { Component } from 'react';

import { resetProductInfo } from 'actions/productInfo';

import url from 'urls';
import styles from './ProductInfo.scss';
var cx = classNames.bind(styles);


export class ProductInfo extends Component {

  static propTypes = {
    tax: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
    credit: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    shipping: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    subscription: PropTypes.number.isRequired,

    resetProductInfo: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    this.props.resetProductInfo();
  }

  renderPrice = price => (
    price ? `$${price}` : 'FREE'
  );

  renderDiscount() {
    const { discount } = this.props;

    if (discount) return (
      <div className={styles.row}>
        <div className={styles.col}>
          Discount
        </div>
        <div className={`${styles.col} ${styles.colPink}`}>
          - ${discount}
        </div>
      </div>
    );
  }

  renderCredit() {
    const { credit, balance } = this.props;

    if (balance && balance > credit) return (
      <div className={styles.row}>
        <div className={styles.col}>
          Credit (Balance ${balance})
        </div>
        <div className={styles.col}>
          ${credit}
          <div className="checkbox-pink checkbox-margin-left">
            <input type="checkbox" id="credit" />
            <label htmlFor="credit" />
          </div>
        </div>
      </div>
    );
  }

  renderImage() {
    const { imageUrl } = this.props;

    return imageUrl
      ? imageUrl
      : 'Какой-то url на картинку по умолчанию';
  }

  render() {
    const {
      tax,
      total,
      loading,
      shipping,
      subscription,
    } = this.props;

    return (
      <div className={cx('box', { loading })}>
        <div className={styles.image}>
          <img src={this.renderImage()} alt="product image" />
        </div>
        <div className={styles.info}>
          <div className={styles.infoBox}>
            <div className={styles.row}>
              <div className={styles.col}>
                Monthly subscription
              </div>
              <div className={styles.col}>
                {this.renderPrice(subscription)}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                Shipping
              </div>
              <div className={styles.col}>
                {this.renderPrice(shipping)}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                Tax
              </div>
              <div className={styles.col}>
                {this.renderPrice(tax)}
              </div>
            </div>
            {this.renderDiscount()}
            {this.renderCredit()}
          </div>
        </div>
        <div className={`${styles.row} ${styles.rowTotal}`}>
          <div className={styles.col}>
            <span>total</span>
          </div>
          <div className={styles.col}>
            ${total}
          </div>
        </div>
        <div className={styles.coupon}>
          Have a <Link to={url.product} className="pink-link">coupone code</Link>?
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  ...state.productInfo,
});

const mapDispatchToProps = {
  resetProductInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductInfo);
