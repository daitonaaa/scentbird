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
    title: 'Элемент',
    childs: [
      {
        id: 1,
        title: 'Дочерний элемент'
      },
      {
        id: 2,
        title: 'Дочерний элемент'
      },
      {
        id: 3,
        title: 'Дочерний элемент'
      },
      {
        id: 4,
        title: 'Дочерний элемент'
      },
      {
        id: 5,
        title: 'Дочерний элемент'
      }
    ]
  },
  {
    id: 2,
    title: 'Элемент',
    childs: [
      {
        id: 1,
        title: 'Дочерний элемент'
      },
      {
        id: 2,
        title: 'Дочерний элемент'
      }
    ]
  },
  {
    id: 3,
    title: 'Элемент',
    childs: [
      {
        id: 1,
        title: 'Дочерний элемент'
      },
      {
        id: 2,
        title: 'Дочерний элемент'
      },
      {
        id: 3,
        title: 'Дочерний элемент'
      }
    ]
  }
];
