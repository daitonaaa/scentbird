import {
  setLoadingStatus,
  resetPaymentForm,
  setPaymentFormError,
  deletePaymentFormError,
  changePaymentFormData,
  resetPaymentFormBilling,
  setPaymentFormErrorObject,
  setPaymentFormBillingStatus,
} from 'actions/paymentForm';
import * as actionTypes from 'constants/actionTypes';


describe('> > > ACTIONS - paymentForm.js', () => {
  it('#action: setLoadingStatus', () => {
    expect(setLoadingStatus())
      .toEqual({ type: actionTypes.PAYMENT_FORM_SET_LOADING_STATUS});
  });

  it('#action: setPaymentFormBillingStatus', () => {
    expect(setPaymentFormBillingStatus(true))
      .toEqual({
        type: actionTypes.PAYMENT_FORM_SET_BILLING_ADDRESS_STATUS,
        status: true,
      });
  });

  it('#action: setPaymentFormError', () => {
    expect(setPaymentFormError('email', 'Enter the data'))
      .toEqual({
        type: actionTypes.PAYMENT_FORM_SET_ERROR,
        name: 'email',
        text: 'Enter the data',
      });
  });

  it('#action: setPaymentFormErrorObject', () => {
    expect(setPaymentFormErrorObject({
      email: 'This field is required',
      password: 'This field is required',
    }))
      .toEqual({
        type: actionTypes.PAYMENT_FORM_SET_ERROR_OBJECT,
        errors: {
          email: 'This field is required',
          password: 'This field is required',
        }
      });
  });

  it('#action: deletePaymentFormError', () => {
    expect(deletePaymentFormError('email'))
      .toEqual({
        type: actionTypes.PAYMENT_FORM_DELETE_ERROR,
        name: 'email',
      });
  });

  it('#action: changePaymentFormData', () => {
    expect(changePaymentFormData('something', 'email'))
      .toEqual({
        type: actionTypes.PAYMENT_FORM_CHANGE_DATA,
        value: 'something',
        name: 'email',
      });
  });

  it('#action: resetPaymentFormBilling', () => {
    expect(resetPaymentFormBilling())
      .toEqual({
        type: actionTypes.PAYMENT_FORM_RESET_BILLING,
      });
  });

  it('#action: resetPaymentForm', () => {
    expect(resetPaymentForm())
      .toEqual({
        type: actionTypes.PAYMENT_FORM_RESET,
      });
  });
});
