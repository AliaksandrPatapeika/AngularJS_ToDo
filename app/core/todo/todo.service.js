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
      reloadState,
      getAllTasks,
      getTaskById,
      addTask,
      addTaskArray,
      deleteTask,
      deleteTaskArray,
      updateTask,
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

    function reloadState() {
      $state.reload();
      console.log('state is reloaded');
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
    function getId(data) {
      return data._id;
    }

    function getAllTasks() {
      return $http({
        url: taskUrl,
        method: 'GET',
        params: {
          apikey: restdb.apikey
        }
      })
          .then((response) => {
            console.log('Response = ', response.data);
            return response.data;
          })
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
      })
          .then((response) => {
            console.log('Response = ', response.data);
            return response.data;
          })
          .catch((response) => {
            return $q.reject('Error: can not create data in restdb.')
          });

    }

    // Post array data. Request body is an array of JSON documents.
    function addTaskArray(taskArray) {
      console.log(taskArray);
      return $http({
        url: taskUrl,
        method: 'POST',
        params: {
          apikey: restdb.apikey
        },
        headers: {
          'Content-Type': 'application/json'
        },
        data: taskArray
      })
          .then((response) => {
            console.log('Response = ', response.data);
            return response.data;
          })
          .catch((response) => {
            return $q.reject('Error: can not create data in restdb.')
          });

    }

    function deleteTask(taskToDelete) {
      console.log(taskToDelete);
      return $http({
        url: `${taskUrl}/${getId(taskToDelete)}`,
        method: 'DELETE',
        params: {
          apikey: restdb.apikey
        }
      })
          .then((response) => {
            console.log('Response = ', response.data);
            return response.data;
          })
          .catch((response) => {
            return $q.reject('Error: can not delete data in restdb.')
          });
    }

    // Delete an array of documents in a collection. Request body must be an array of ID's.
    function deleteTaskArray(taskIdArrayToDelete) {
      console.log('taskIdArrayToDelete: ', taskIdArrayToDelete);
      return $http({
        url: `${taskUrl}/*`,
        method: 'DELETE',
        params: {
          apikey: restdb.apikey
        },
        headers: {
          'Content-Type': 'application/json'
        },
        data: taskIdArrayToDelete
      })
          .then((response) => {
            console.log('Response = ', response.data.result);
            return response.data.result;
          })
          .catch((response) => {
            return $q.reject('Error: can not delete data in restdb.')
          });
    }

    function updateTask(taskToUpdate) {
      console.log(taskToUpdate);
      return $http({
        url: `${taskUrl}/${getId(taskToUpdate)}`,
        method: 'PUT',
        params: {
          apikey: restdb.apikey
        },
        data: taskToUpdate
      })
          .then((response) => {
            console.log('Response = ', response.data);
            return response.data;
          })
          .catch((response) => {
            return $q.reject('Error: can not update data in restdb.')
          });
    }

    function getTaskById(taskId) {
      console.log(taskId);
      return $http({
        url: `${taskUrl}/${taskId}`,
        method: 'GET',
        params: {
          apikey: restdb.apikey
        }
      })
          .then((response) => {
            console.log('Response = ', response.data);
            return response.data;
          })
          .catch((response) => {
            return $q.reject('Error: can not retrieve data from restdb.')
          });
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

    // function getTaskById(taskId) {
    //   return getData().query().$promise
    //       .then((tasks) => {
    //         const task = tasks.find((task) => task.id === taskId);
    //         if (task) {
    //           console.log('Promise getTaskById() resolve.');
    //           return task;
    //         } else {
    //           throw new Error(`Task with id = "${taskId}" not found.`);
    //         }
    //       })
    //       .catch((error) => {
    //         return new Error(printError(error, 'Promise getTaskById() rejected!'));
    //       })
    //       .finally(() => console.log('Promise getTaskById() complete.'));
    // }

    function navigate(toState, params) {
      $state.go(toState, params);
    }
  }

})();
