(function () {
  'use strict';

  angular
      .module('todoListApp')
      .config(configAppRouter);

  configAppRouter.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function configAppRouter($locationProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/tasks');
    $locationProvider.hashPrefix('!');

    $stateProvider
        .state('todoList', {
          url: '/tasks',
          template: '<todo-list></todo-list>'
        })
        .state('taskDetail', {
          url: '/tasks/:taskId',
          template: '<task-detail></task-detail>'
        });
  }

})();
