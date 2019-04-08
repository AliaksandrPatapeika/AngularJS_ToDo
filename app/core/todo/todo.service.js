(function () {
  'use strict';

  angular
      .module('core.todo')
      // Название нашего сервиса и фабричная функция
      // Сервис `todoService` объявляет зависимость от сервиса `$resource`, который предоставлят модуль `ngResource`.
      // Сервис `$resource` позволяет легко создать клиент RESTful с помощью всего лишь нескольких строк кода. Этот клиент
      // может затем использоваться в нашем приложении вместо низкоуровневой службы `$http`.
      .factory('todoService', todoService);

  // todoService.$inject = ['$resource', '$state'];
  todoService.$inject = ['$http', '$q', '$state', 'restdb'];

  /* @ngInject */

  // function todoService($resource, $state) {
  function todoService($http, $q, $state, restdb) {
    // Connection URL
    const taskUrl = `https://${restdb.databaseName}.restdb.io/rest/${restdb.collectionName}`;

    return {
      // сокращенно от:
      // getTaskList: getTaskList,
      // generateId: generateId
      getAllTasks,
      getTaskById,
      addTask,
      // deleteTask,
      // updateTask,
      // importantTask,
      generateId,
      navigate
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


    // --------------------------------------------------
    function sendResponseData(response) {
      console.log(response);
      return response.data;
    }

    function getAllTasks() {
      return $http({
        url: taskUrl,
        method: 'GET',
        params: {
          apikey: restdb.apikey
        }
      })
          .then((response) => sendResponseData(response))
          .catch((response) => {
            return $q.reject('Error: can not retrieve data from restdb.')
          });
    }

    function addTask(newTask) {
      console.log(newTask);
      return $http({
        url: taskUrl,
        method: 'POST',
        params: {
          apikey: restdb.apikey
        },
        data: newTask
        // transformRequest: testNormalize
      })
          .then((response) => {
            sendResponseData(response);
            $state.reload();
            console.log('state is reloaded');
          })
          .catch((response) => {
            return $q.reject('Error: can not retrieve data from restdb.')
          });

      // function testNormalize(data) {
      //   data.done = true;
      //
      //   return angular.toJson(data);
      //
      // }

    }



    // --------------------------------------------------

    // function getAllTasks() {
    //   return getData().query().$promise
    //       .then((tasks) => {
    //         console.log('Promise getAllTasks() resolve.');
    //         return tasks;
    //       })
    //       .catch((error) => {
    //         return new Error(printError(error, 'Promise getAllTasks() rejected!'));
    //       })
    //       .finally(() => console.log('Promise getAllTasks() complete.'));
    // }

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

    function navigate(toState, params) {
      $state.go(toState, params);
    }
  }

})();
