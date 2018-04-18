import { fromJS } from 'immutable';

export default {

  immutableize: reducer => (state, action) => {
    state = reducer(fromJS(state), action);

    return state.toJS === undefined
      ? state
      : state.toJS();
  },

  emailValidate: value => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  },

  cardValid: value => {
    if (!value.trim()) return;

    // Luhn Algorithm
    const arr = [], cardNumber = value;

    for (let i = 0; i < value.length; i++) {
      if (i % 2 === 0) {
        const m = parseInt(cardNumber[i]) * 2;
        m > 9
          ? arr.push(m - 9)
          : arr.push(m);
      } else {
        const n = parseInt(cardNumber[i]);
        arr.push(n);
      }
    }

    const summ = arr.reduce((a, b) => a + b);
    return Boolean(!(summ % 10));
  }
};
