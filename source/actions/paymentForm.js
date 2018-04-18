import * as actionTypes from 'constants/actionTypes';
import api from 'api/paymentForm';


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


export const setPaymentFormErrorObject = errors => ({
  type: actionTypes.PAYMENT_FORM_SET_ERROR_OBJECT,
  errors,
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


export const changePaymentFormBillingStatus = status => (dispatch, getState) => {
  dispatch(setPaymentFormBillingStatus(status));

  if (status) {
    const errors = getState().paymentForm.errors;
    const billingNames = [
      'billingApt',
      'billingCity',
      'billingStreet',
      'billingRegion',
      'billingCountry',
      'billingPostCode',
    ];

    dispatch(resetPaymentFormBilling());

    billingNames.forEach(name => {
      if (errors[name]) {
        dispatch(deletePaymentFormError(name));
      }
    });
  }
};


export const submitPaymentForm = () => (dispatch, getState) => {
  dispatch(setLoadingStatus(true));

  const { errors, data, billingAddress } = getState().paymentForm;
  const haveErrors = Object.values(errors).length;

  if (haveErrors || !valid(billingAddress, data, dispatch)) {

    return;
  }
  else return api.postOrder().then(
    () => {
      dispatch(setLoadingStatus(false));
      alert('Form submitted! Thank you for your purchase!');
    },
    error => console.log(error)
  );
};


// helpers
const valid = (billingAddress, data, dispatch) => {
  const params = [
    'year',
    'email',
    'month',
    'password',
    'lastName',
    'firstName',
    'creditCard',
    'shippingCity',
    'securityCode',
    'shippingRegion',
    'shippingStreet',
    'shippingCountry',
    'shippingPostCode',
  ];

  if (!billingAddress) params.push(...[
    'billingCity',
    'billingStreet',
    'billingRegion',
    'billingCountry',
    'billingPostCode',
  ]);

  const errors = {};
  let noErrors = true;

  params.forEach(name => {
    if (!data[name]) {
      noErrors = false;
      errors[name] = 'This field is required';
    }
  });

  if (Object.values(errors).length) {
    dispatch(setPaymentFormErrorObject(errors));
  }

  return noErrors;
};

