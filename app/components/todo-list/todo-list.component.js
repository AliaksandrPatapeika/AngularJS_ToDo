(function () {
  'use strict';

  angular
      .module('todoList')
      .component('todoList', {
        templateUrl: 'components/todo-list/todo-list.template.html',
        controller: TodoListController
      });

  TodoListController.$inject = ['todoService'];

  function TodoListController(todoService) {
    let $ctrl = this;

    init();

    function init() {
      $ctrl.setError = setError;
      $ctrl.loading = false;
      $ctrl.filterName = 'all';
      loadData()
    }

    function setError(error) {
      $ctrl.error = error;
    }

    function loadData() {
      $ctrl.loading = true;
      todoService.getAllTasks()
          .then((tasks) => {
            $ctrl.loading = false;
            $ctrl.tasks = tasks;
          })
          .catch((error) => {
            $ctrl.loading = false;
            $ctrl.error = error.message.split('\n');
          });
    }

  }

})();
