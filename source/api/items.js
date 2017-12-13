export default {

  // Как должно быть.. но мы будем имитировать работу сервера
  // getItemsList: params => (
  //   axios.get('api/v1/items', { params })
  // ),

  getItemsList: () => new Promise(
    (resolve, reject) => setTimeout(
      () => resolve(list), 2000
    )
  )
};

// Ещё можно имитировать каждое действие с выделением check
// синхронизируя, через сервер, но я думаю, что и так ясен смысл

// Fish
const list = [
  {
    id: 1,
    title: 'Кошки',
    childs: [
      {
        id: 1,
        title: 'Персидская'
      },
      {
        id: 2,
        title: 'Сиамская'
      },
      {
        id: 3,
        title: 'Рэгдолл'
      },
      {
        id: 4,
        title: 'Мейн-кун'
      },
      {
        id: 5,
        title: 'Сфинкс'
      }
    ]
  },
  {
    id: 2,
    title: 'Собаки',
    childs: [
      {
        id: 1,
        title: 'Немецкая'
      },
      {
        id: 2,
        title: 'Ротвейлер'
      },
      {
        id: 3,
        title: 'Ретривер'
      },
      {
        id: 4,
        title: 'Хаски'
      },
      {
        id: 5,
        title: 'Корги'
      }
    ]
  },
  {
    id: 3,
    title: 'Грызуны',
    childs: [
      {
        id: 1,
        title: 'Хомяк'
      },
      {
        id: 2,
        title: 'Шиншилла'
      },
      {
        id: 3,
        title: 'Мышь'
      }
    ]
  }
];
