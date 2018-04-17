export default {
  getProductInfo: () => new Promise(
    (resolve, reject) => setTimeout(
      () => resolve(productInfo), 1500
    )
  )
};

// Fish
const productInfo = {};
