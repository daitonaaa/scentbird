export default {
  getProductInfo: () => new Promise(
    (resolve, reject) => setTimeout(
      () => resolve(serverData), 500
    )
  )
};

// Fish
const serverData = {
  imageUrl: 'http://test2.ortuna.ru/productPhoto.png',
  tax: 2.35,
  credit: 50,
  balance: 100,
  discount: 5,
  shipping: 0,
  subscription: 14.95,
  total: 25,
};
