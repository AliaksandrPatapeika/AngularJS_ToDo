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

  TaskItemController.$inject = ['todoService'];

  function TaskItemController(todoService) {
    let $ctrl = this;

    init();

    function init() {
      $ctrl.importantTask = importantTask;
      $ctrl.taskDoneChange = taskDoneChange;
      $ctrl.deleteTask = deleteTask;
      $ctrl.navigate = todoService.navigate;
    }

    function importantTask(task) {
      // TODO TODO TODO
      task.important = !task.important;
      todoService.updateTask(task);
    }

    function taskDoneChange(task) {
      todoService.updateTask(task);
    }

    function deleteTask(task) {
      todoService.deleteTask(task)
          .then(() => {
            const index = $ctrl.tasks.indexOf(task);
            $ctrl.tasks.splice(index, 1);
          });

    }

  }

})();
