(function () {
  'use strict';

// Метод модуля .config() дает доступ к доступным провайдерам для настройки.
// Теперь, в дополнение к основным сервисам и директивам, мы также можем настроить сервис $route (используя его
// провайдер $routeProvider)) для нашего приложения. А затем используем их методы для определения поведения
// соответствующих сервисов. Здесь мы используем методы $routeProvider.when () и $routeProvider.otherwise () для определения маршрутов нашего приложения.
// Чтобы можно было быстро найти код конфигурации, мы поместили его в отдельный файл и использовали суффикс `.config`.
  angular
      .module('todoListApp')
      .config(configAppRouter);

  configAppRouter.$inject = ['$locationProvider', '$routeProvider'];

  /* @ngInject */
  function configAppRouter($locationProvider, $routeProvider) {
    // Мы также использовали $locationProvider.hashPrefix(), чтобы установить хеш-префикс `!`. Этот префикс
    // появится в ссылках на клиентские маршруты, сразу после символа хеша (#) и перед фактическим путем (например, index.html#!/some/path).
    // Установка префикса не обязательна, но считается хорошей практикой. `!` это наиболее часто используемый префикс.
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/tasks', {
          template: '<todo-list></todo-list>'
        })
        // <taskId> является переменной частью URL
        // Все переменные, определенные с префиксом `:` извлекаются в (injectable) объект $routeParams.
        .when('/tasks/:taskId', {
          template: '<task-detail></task-detail>'
        })
        .otherwise('/tasks');
  }

})();
