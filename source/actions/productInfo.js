import * as actionTypes from 'constants/actionTypes';
import api from 'api/productInfo';


export const setProductInfo = payload => ({
  type: actionTypes.PRODUCT_INFO_SET_DATA,
  payload,
});

export const setLoadingStatus = status => ({
  type: actionTypes.PRODUCT_INFO_SET_LOADING_STATUS,
  status,
});

export const resetProductInfo = () => ({
  type: actionTypes.PRODUCT_INFO_RESET,
});


export const getProductInfo = (productId = 4523) => dispatch => {
  dispatch(setLoadingStatus(true));

  return api.getProductInfo(productId).then(
    response => dispatch(setProductInfo(response)),
    error => console.log(error)
  );
};
