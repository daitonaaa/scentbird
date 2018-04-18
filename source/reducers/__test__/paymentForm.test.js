import reducer from 'reducers/paymentForm';
import * as actionTypes from 'constants/actionTypes';


describe('> > > REDUCER - paymentForm.js', () => {

  it(`#case: ${actionTypes.PAYMENT_FORM_SET_LOADING_STATUS}`, () => {
    let state = { loading: false };
    state = reducer(state, {
      type: actionTypes.PAYMENT_FORM_SET_LOADING_STATUS,
      status: true,
    });

    expect(state).toEqual({ loading: true });
  });

  it(`#case: ${actionTypes.PAYMENT_FORM_SET_BILLING_ADDRESS_STATUS}`, () => {
    let state = { billingAddress: true };
    state = reducer(state, {
      type: actionTypes.PAYMENT_FORM_SET_BILLING_ADDRESS_STATUS,
      status: false,
    });

    expect(state).toEqual({ billingAddress: false });
  });

  it(`#case: ${actionTypes.PAYMENT_FORM_SET_ERROR}`, () => {
    let state = { errors: {} };
    state = reducer(state, {
      type: actionTypes.PAYMENT_FORM_SET_ERROR,
      name: 'email',
      text: 'Enter the data',
    });

    expect(state).toEqual({ errors: {
      email: 'Enter the data',
    }});
  });

  it(`#case: ${actionTypes.PAYMENT_FORM_SET_ERROR_OBJECT}`, () => {
    let state = { errors: {} };
    state = reducer(state, {
      type: actionTypes.PAYMENT_FORM_SET_ERROR_OBJECT,
      errors: {
        email: 'This field is required',
        password: 'This field is required',
      }
    });

    expect(state).toEqual({ errors: {
      email: 'This field is required',
      password: 'This field is required',
    }});
  });

  it(`#case: ${actionTypes.PAYMENT_FORM_DELETE_ERROR}`, () => {
    let state =  { errors: {
      email: 'Enter the data',
    }};
    state = reducer(state, {
      type: actionTypes.PAYMENT_FORM_DELETE_ERROR,
      name: 'email',
    });

    expect(state).toEqual({ errors: {} });
  });

  it(`#case: ${actionTypes.PAYMENT_FORM_CHANGE_DATA}`, () => {
    let state =  { data: {
      email: '',
    }};
    state = reducer(state, {
      type: actionTypes.PAYMENT_FORM_CHANGE_DATA,
      value: 'something',
      name: 'email',
    });

    expect(state).toEqual({ data: {
      email: 'something',
    }});
  });

  it(`#case: ${actionTypes.PAYMENT_FORM_RESET_BILLING}`, () => {
    let state =  { data: {
      email: 'something',
      billingStreet: 'something',
      billingApt: 'something',
      billingPostCode: 'something',
      billingCity: 'something',
      billingRegion: 'something',
      billingCountry: 'something',
    }};
    state = reducer(state, {
      type: actionTypes.PAYMENT_FORM_RESET_BILLING,
    });

    expect(state).toEqual({ data: {
      email: 'something',
      billingStreet: '',
      billingApt: '',
      billingPostCode: '',
      billingCity: '',
      billingRegion: '',
      billingCountry: '',
    }});
  });
});
