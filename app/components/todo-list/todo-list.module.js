(function () {
  'use strict';

// Создание модуля `todoList`
// Зависит от модуля `core.todo`, который предоставляет контроллеру `TodoListController` новый сервис `todoService`, вместо
// низкоуровневого сервиса `$http` чтобы упростить контроллер. Сервис Angular $resource проще в использовании, чем $http, для взаимодействия с источниками данных, представленными как ресурсы RESTful.
  angular
      .module('todoList', [
        'core.todo',
        'headContainer',
        'addTask',
        'search',
        'filterButtonsGroup',
        'taskItemList',
        'taskItem'
      ]);

})();
