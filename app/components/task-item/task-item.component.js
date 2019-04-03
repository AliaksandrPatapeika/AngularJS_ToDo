(function () {
  'use strict';

  angular
      .module('taskItem')
      .component('taskItem', {
        templateUrl: 'components/task-item/task-item.template.html',
        controller: TaskItemController,
        bindings: {
          tasks: '<',
          searchTask: '<',
          filterName: '<'
        }
      });

  TaskItemController.$inject = ['$location'];

  function TaskItemController($location) {
    let $ctrl = this;

    $ctrl.importantTask = importantTask;
    $ctrl.deleteTask = deleteTask;
    $ctrl.goToTaskDetailView = goToTaskDetailView;

    function importantTask(task) {
      task.important = !task.important;
    }

    function deleteTask(task) {
      const index = $ctrl.tasks.indexOf(task);
      $ctrl.tasks.splice(index, 1);
    }

    function goToTaskDetailView(task) {
      $location.path(`/tasks/${task.id}`);
    }

  }

})();
