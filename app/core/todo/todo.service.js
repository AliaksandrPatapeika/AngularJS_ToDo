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

    function getAllTasks() {
      return $resource('data/tasks.json', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }

    function getTaskById(taskId) {
      console.log('taskId222 = ', taskId);
      // return getAllTasks().query((tasks) => {
      //   return tasks.find((task) => task.id === taskId);
      // })
    }

    function generateId() {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  }

})();
