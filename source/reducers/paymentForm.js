import { helpers } from 'utils';
import Immutable from 'immutable';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  loading: false,
  billingAddress: true,
  errors: {},
  data: {
    // block - Create account
    email: '',
    password: '',
    // block - Shipping address
    firstName: '',
    lastName: '',
    shippingStreet: '',
    shippingApt: '',
    shippingPostCode: '',
    shippingCity: '',
    shippingRegion: '',
    shippingCountry: '',
    phone: '',
    // block - Billing address
    billingStreet: '',
    billingApt: '',
    billingPostCode: '',
    billingCity: '',
    billingRegion: '',
    billingCountry: '',
    // block - Credit card
    creditCard: '',
    securityCode: '',
    month: '',
    year: '',
  }
});


function paymentForm(state = initialState, action) {
  switch (action.type) {

    case actionTypes.PAYMENT_FORM_SET_LOADING_STATUS:
      return state.set('loading', action.status);

    case actionTypes.PAYMENT_FORM_SET_BILLING_ADDRESS_STATUS:
      return state.set('billingAddress', action.status);

    case actionTypes.PAYMENT_FORM_SET_ERROR:
      return state.setIn(['errors', action.name], action.text);

    case actionTypes.PAYMENT_FORM_DELETE_ERROR:
      return state.deleteIn(['errors', action.name]);

    case actionTypes.PAYMENT_FORM_CHANGE_DATA:
      return state.setIn(['data', action.name], action.value);

    case actionTypes.PAYMENT_FORM_RESET_BILLING:
      return state.mergeIn(['data'], {
        billingStreet: '',
        billingApt: '',
        billingPostCode: '',
        billingCity: '',
        billingRegion: '',
        billingCountry: '',
      });

    case actionTypes.PAYMENT_FORM_RESET:
      return initialState;

    default:
      return state;
  }
}

export default helpers.immutableize(paymentForm);

