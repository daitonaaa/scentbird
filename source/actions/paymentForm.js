import * as actionTypes from 'constants/actionTypes';


export const setLoadingStatus = status => ({
  type: actionTypes.PAYMENT_FORM_SET_LOADING_STATUS,
  status,
});

export const setPaymentFormBillingStatus = status => ({
  type: actionTypes.PAYMENT_FORM_SET_BILLING_ADDRESS_STATUS,
  status,
});

export const setPaymentFormError = (name, text) => ({
  type: actionTypes.PAYMENT_FORM_SET_ERROR,
  name,
  text,
});

export const deletePaymentFormError = name => ({
  type: actionTypes.PAYMENT_FORM_DELETE_ERROR,
  name,
});

export const changePaymentFormData = (value, name) => ({
  type: actionTypes.PAYMENT_FORM_CHANGE_DATA,
  value,
  name,
});

export const resetPaymentFormBilling = () => ({
  type: actionTypes.PAYMENT_FORM_RESET_BILLING,
});

export const resetPaymentForm = () => ({
  type: actionTypes.PAYMENT_FORM_RESET,
});
