(function () {
  'use strict';

  angular
      .module('core.todo')
      // Настроить httpInterceptor в приложении:
      .config(configModule)
      // Название нашего сервиса и фабричная функция
      // Сервис `todoService` объявляет зависимость от сервиса `$resource`, который предоставлят модуль `ngResource`.
      // Сервис `$resource` позволяет легко создать клиент RESTful с помощью всего лишь нескольких строк кода. Этот клиент
      // может затем использоваться в нашем приложении вместо низкоуровневой службы `$http`.
      .factory('todoService', todoService)
      // Создать httpInterceptor с вашим запросом (request)
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

  // Настроить httpInterceptor в приложении:
  function configModule($httpProvider) {
    // Прямо сейчас, когда у вас настроен ваш httpProvider, на котором есть перехватчик, куда бы вы ни вводили $ http, вы будете использовать этого провайдера, чтобы ... вы выполняли свои функции request, response и responseError.

    // Поскольку $ resource использует $ http, и у вас настроен глобальный httpProvider, вы будете вызывать функцию ваших перехватчиков, когда будете использовать свой ресурс

    // (перехватчики) установлены глобально
    $httpProvider.interceptors.push('restdbAPIInterceptor');
  }

  todoService.$inject = ['$resource', '$state', 'restdb'];

  function todoService($resource, $state, restdb) {
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

    function Tasks() {
      return $resource(`${taskUrl}/:taskId`, {}, {
        update: {
          method: 'PUT'
        },
        // DELETE requests can have a body since angular-resource v.1.6.4
        deleteArray: {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          hasBody: true
        }
      });
    }

    function getAllTasks() {
      return Tasks().query().$promise
          .then((response) => response) // array of tasks
          .catch((error) => {
            throw new Error(printError(error, 'Сan not fetch all tasks from "restdb"!'))
          });
    }

    function getTaskById(taskId) {
      return Tasks().get({taskId: taskId}).$promise
          .then((response) => sendResponseToJson(response)) // task object
          .catch((error) => {
            throw new Error(printError(error, `Сan not fetch task by id = "${taskId}" from "restdb"!`))
          });
    }

    function addTask(newTask) {
      return Tasks().save(newTask).$promise
          .then((response) => sendResponseToJson(response)) // new task object
          .catch((error) => {
            throw new Error(printError(error, `Сan not create data in "restdb"!`))
          });
    }

    function deleteTask(taskToDeleteId) {
      return Tasks().delete({taskId: taskToDeleteId}).$promise
          .then((response) => response.result[0]) // deleted task id
          .catch((error) => {
            throw new Error(printError(error, `Сan not delete task with id = "${taskToDeleteId}" from "restdb"!`))
          });
    }

    // Delete an array of documents in a collection. Request body must be an array of id's.
    function deleteTaskArray(taskIdArrayToDelete) {
      return Tasks().deleteArray({taskId: '*'}, taskIdArrayToDelete).$promise
          .then((response) => response.result) // deleted tasks id's array
          .catch((error) => {
            throw new Error(printError(error, `Сan not delete data from "restdb"!`))
          });
    }

    function updateTask(taskToUpdate) {
      // вызываем update, передавая сначала ID, затем объект, который мы обновляем
      return Tasks().update({taskId: taskToUpdate._id}, taskToUpdate).$promise
          .then((response) => sendResponseToJson(response)) // updated task object
          .catch((error) => {
            throw new Error(printError(error, `Сan not update data in "restdb"!`))
          });
    }

    function sendResponseToJson(response) {
      // toJSON() удаляет из response поля $promise и $resolved
      return response.toJSON();
    }

    function navigate(toState, params) {
      console.log('Navigate to: ', toState);
      $state.go(toState, params);
    }

    function reloadState(toState) {
      // A method that force reloads the current state and reinstantiates components. Second parameter is for $stateParams
      console.log('state is reloaded');
      $state.go(toState, {}, {reload: true});
    }

    function printError(error, label) {
      let err = `${label}`;
      error.name && (err += `\nName: "${error.name}"`);
      error.message && (err += `\nMessage: "${error.message}"`);
      error.config && error.config.method && (err += `\nMethod: "${error.config.method}"`);
      error.config && error.config.url && (err += `\nURL: "${error.config.url}"`);
      error.status && (err += `\nStatus: "${error.status}"`);
      error.statusText && (err += `\nStatus text: "${error.statusText}"`);
      return err;
    }

  }

})();
