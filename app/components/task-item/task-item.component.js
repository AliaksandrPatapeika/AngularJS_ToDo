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
        },
        require: {
          todoList: '^todoList'
        }
      });

  TaskItemController.$inject = ['todoService'];

  function TaskItemController(todoService) {
    let $ctrl = this;

    init();

    function init() {
      $ctrl.loading = false;
      $ctrl.navigate = navigate;
      $ctrl.taskImportantChange = taskImportantChange;
      $ctrl.taskDoneChange = taskDoneChange;
      $ctrl.deleteTask = deleteTask;
    }

    function navigate(toState, params) {
      todoService.navigate(toState, params);
    }

    function taskImportantChange(task) {
      $ctrl.loading = task._id;
      let copyTask = Object.assign({}, task);
      copyTask.important = !task.important;
      todoService.updateTask(copyTask)
          .then(() => {
            $ctrl.loading = false;
            task.important = !task.important;
          });
    }

    function taskDoneChange(task) {
      $ctrl.loading = task._id;
      task.done = !task.done;
      let copyTask = Object.assign({}, task);
      copyTask.done = !task.done;
      todoService.updateTask(copyTask)
          .then(() => {
            $ctrl.loading = false;
            task.done = !task.done;
          });
    }

    function deleteTask(task) {
      $ctrl.loading = task._id;
      todoService.deleteTask(task)
          .then((deletedTaskId) => {
            $ctrl.loading = false;
            const index = $ctrl.tasks.indexOf(task);
            $ctrl.tasks.splice(index, 1);
            // $ctrl.tasks = $ctrl.tasks.filter((task) => {
            //   return task._id !== deletedTaskId;
            // });
          })
          .catch((error) => {
            $ctrl.loading = false;
            $ctrl.todoList.setError(error.message.split('\n'));
          });
    }
  }

})();
