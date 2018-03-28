// Решаем ошибку с requestAnimationFrame
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

// Рушим тест при любой ошибке
console.error = message => {
  throw new Error(message);
};
