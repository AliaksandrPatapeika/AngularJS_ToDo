(function () {
  'use strict';

  angular
      .module('core.task')
      // Название нашего сервиса и фабричная функция
      // Сервис `Task` объявляет зависимость от сервиса `$resource`, который предоставлят модуль `ngResource`.
      // Сервис `$resource` позволяет легко создать клиент RESTful с помощью всего лишь нескольких строк кода. Этот клиент
      // может затем использоваться в нашем приложении вместо низкоуровневой службы `$http`.
      .factory('Task', ['$resource', Task]);


  function Task ($resource) {
    return $resource('data/tasks.json', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
})();
