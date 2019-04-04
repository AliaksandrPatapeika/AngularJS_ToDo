(function () {
  'use strict';

  angular
      .module('core.todo')
      // Название нашего сервиса и фабричная функция
      // Сервис `todoService` объявляет зависимость от сервиса `$resource`, который предоставлят модуль `ngResource`.
      // Сервис `$resource` позволяет легко создать клиент RESTful с помощью всего лишь нескольких строк кода. Этот клиент
      // может затем использоваться в нашем приложении вместо низкоуровневой службы `$http`.
      .factory('todoService', todoService);

  todoService.$inject = ['$resource'];

  /* @ngInject */
  function todoService($resource) {
    return {
      // сокращенно от:
      // getTaskList: getTaskList,
      // generateId: generateId
      getAllTasks,
      getTaskById,
      generateId
    };

    ////////////////
    function getData() {
      return $resource('data/tasks.json', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }

    function printError(error, label) {
      let err = `${label}`;
      // Если левый аргумент – false, оператор И(&&) возвращает его и заканчивает вычисления. Иначе – вычисляет и возвращает правый аргумент.
      error.name && (err += `\nName: "${error.name}"`);
      error.message && (err += `\nMessage: "${error.message}"`);
      // оператор && вычисляет операнды слева направо до первого «ложного» и возвращает его, а если все истинные – то последнее значение.
      error.config && error.config.method && (err += `\nMethod: "${error.config.method}"`);
      error.config && error.config.url && (err += `\nURL: "${error.config.url}"`);
      error.status && (err += `\nStatus: "${error.status}"`);
      error.statusText && (err += `\nStatus text: "${error.statusText}"`);
      console.log(err);
      return err;
    }

    function getAllTasks() {
      return getData().query().$promise
          .then((tasks) => {
            console.log('Promise getAllTasks() resolve.');
            return tasks;
          })
          .catch((error) => {
            return new Error(printError(error, 'Promise getAllTasks() rejected!'));
          })
          .finally(() => console.log('Promise getAllTasks() complete.'));
    }

    function getTaskById(taskId) {
      return getData().query().$promise
          .then((tasks) => {
            const task = tasks.find((task) => task.id === taskId);
            if (task) {
              console.log('Promise getTaskById() resolve.');
              return task;
            } else {
              throw new Error(`Task with id = "${taskId}" not found.`);
            }
          })
          .catch((error) => {
            return new Error(printError(error, 'Promise getTaskById() rejected!'));
          })
          .finally(() => console.log('Promise getTaskById() complete.'));
    }

    function generateId() {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  }

})();
