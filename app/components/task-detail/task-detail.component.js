(function () {
  'use strict';

  angular
      .module('taskDetail')
      .component('taskDetail', {
        templateUrl: 'components/task-detail/task-detail.template.html',
        controller: TaskDetailController
      });

  TaskDetailController.$inject = ['$stateParams', 'todoService'];

  function TaskDetailController($stateParams, todoService) {
    let $ctrl = this;

    init();

    function init() {
      $ctrl.loading = false;
      $ctrl.navigate = navigate;
      loadData()
    }

    function navigate(toState, params) {
      todoService.navigate(toState, params);
    }

    function loadData() {
      $ctrl.loading = true;
      todoService.getTaskById($stateParams.taskId)
          .then((task) => {
            $ctrl.loading = false;
            $ctrl.task = task;
          })
          .catch((error) => {
            $ctrl.loading = false;
            $ctrl.error = error.message.split('\n');
          });
    }

  }

})();
