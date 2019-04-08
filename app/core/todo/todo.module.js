// Мы создаем собственный сервис для предоставления доступа к данным задач на сервере. Мы поместим сервис в его
// собственный модуль `core.todo`, под модуль `core`, чтобы мы могли явно объявить его зависимость от `ngResource`.
(function () {
  'use strict';

  // создание модуля, который зависит от модуля `ngResource` и `ui.router`
  angular
      .module('core.todo', [
        'ngResource',
        'ui.router',
        'core.todo.constants'
      ]);

})();
