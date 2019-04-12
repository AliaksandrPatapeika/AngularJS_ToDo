(function () {
  'use strict';

  angular
      .module('core.todo')
      .config(configModule)
      // Название нашего сервиса и фабричная функция
      // Сервис `todoService` объявляет зависимость от сервиса `$resource`, который предоставлят модуль `ngResource`.
      // Сервис `$resource` позволяет легко создать клиент RESTful с помощью всего лишь нескольких строк кода. Этот клиент
      // может затем использоваться в нашем приложении вместо низкоуровневой службы `$http`.
      .factory('todoService', todoService)
      .factory('restdbAPIInterceptor', restdbAPIInterceptor);

  restdbAPIInterceptor.$inject = ['restdb'];

  function restdbAPIInterceptor(restdb) {
    return {
      request: requestInterceptor
    };

    function requestInterceptor(config) {
      // Before the each request is sent out, set request params on the request config
      config.params = {
        apikey: restdb.apikey
      };
      return config;
    }
  }

  configModule.$inject = ['$httpProvider'];

  function configModule($httpProvider) {
    $httpProvider.interceptors.push('restdbAPIInterceptor');
  }

  // todoService.$inject = ['$resource', '$state'];
  todoService.$inject = ['$resource', '$http', '$q', '$state', 'restdb'];

  // function todoService($resource, $state) {
  function todoService($resource, $http, $q, $state, restdb) {
    // Connection URL
    const taskUrl = `https://${restdb.databaseName}.restdb.io/rest/${restdb.collectionName}`;

    return {
      getAllTasks,
      getTaskById,
      addTask,
      deleteTask,
      deleteTaskArray,
      updateTask,
      navigate,
      reloadState
    };

    function reloadState() {
      // A method that force reloads the current state, or a partial state hierarchy. All resolves are re-resolved,
      // and components reinstantiated.
      $state.reload();
      console.log('state is reloaded');
    }

    function printError(error, label) {
      let err = `${label}`;
      error.name && (err += `\nName: "${error.name}"`);
      error.message && (err += `\nMessage: "${error.message}"`);
      error.config && error.config.method && (err += `\nMethod: "${error.config.method}"`);
      error.config && error.config.url && (err += `\nURL: "${error.config.url}"`);
      error.status && (err += `\nStatus: "${error.status}"`);
      error.statusText && (err += `\nStatus text: "${error.statusText}"`);
      console.log(err);
      return err;
    }

    function addTask(newTask) {
      console.log(newTask);
      return $http({
        url: taskUrl,
        method: 'POST',
        // params: {
        //   apikey: restdb.apikey
        // },
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

    // Delete an array of documents in a collection. Request body must be an array of ID's.
    function deleteTaskArray(taskIdArrayToDelete) {
      console.log('taskIdArrayToDelete: ', taskIdArrayToDelete);
      return $http({
        url: `${taskUrl}/*`,
        method: 'DELETE',
        // params: {
        //   apikey: restdb.apikey
        // },
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
        url: `${taskUrl}/${taskToUpdate._id}`,
        method: 'PUT',
        // params: {
        //   apikey: restdb.apikey
        // },
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


    // --------------------------------------------------
    // --------------------------------------------------
    // --------------------------------------------------
    // --------------------------------------------------

    function getAllTasks() {
      return $resource(taskUrl).query().$promise
          .then((response) => response) // array of tasks
          .catch((error) => {
            throw new Error(printError(error, 'Сan not fetch all tasks from "restdb"!'))
          });
    }

    function getTaskById(taskId) {
      let url = `${taskUrl}/${taskId}`;
      return $resource(url).get().$promise
          .then((response) => response) // task object
          .catch((error) => {
            throw new Error(printError(error, `Сan not fetch task by id = "${taskId}" from "restdb"!`))
          });
    }

    function deleteTask(taskToDelete) {
      let url = `${taskUrl}/${taskToDelete._id}`;
      return $resource(url).delete().$promise
          .then((response) => response.result[0]) // deleted task id
          .catch((error) => {
            throw new Error(printError(error, `Сan not delete task with id = "${taskToDelete._id}" from "restdb"!`))
          });
    }

    function navigate(toState, params) {
      console.log('Navigate to: ', toState);
      $state.go(toState, params);
    }
  }

})();
