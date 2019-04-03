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
          template: '<todo-list tasks="$resolve.tasks"></todo-list>',
          resolve: {
            // пока свойство 'tasks' не получит данные от промиса, template не откроется (не создастся экземпляр контроллера)
            tasks: function (todoService) {
              return todoService.getAllTasks().query();
            }
          }
        })
        // <taskId> является переменной частью URL
        // Все переменные, определенные с префиксом `:` извлекаются в (injectable) объект $routeParams.
        .when('/tasks/:taskId', {
          template: '<task-detail task="$resolve.task"></task-detail>',
          resolve: {
            // пока свойство 'task' не получит данные от промиса, template не откроется (не создастся экземпляр контроллера)
            task: function ($routeParams, todoService) {
              let id = $routeParams;
              // id.test = "test";
              // for (let key in id) {
                console.log(id);
              // }

              console.log(Object.keys($routeParams));
              console.log(typeof id);
              // console.log('taskId1 = ', id);
              // return todoService.getTaskById($routeParams.taskId);
              todoService.getTaskById(id);
            }
          }
        })
        .otherwise('/tasks');
  }

})();
