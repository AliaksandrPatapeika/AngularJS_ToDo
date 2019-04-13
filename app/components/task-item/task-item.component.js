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
      let updatedTask = Object.assign({}, task);
      updatedTask.important = !task.important;
      todoService.updateTask(updatedTask)
          .then((responseUpdatedTask) => {
            $ctrl.loading = false;
            task.important = !task.important;
          })
          .catch((error) => {
            $ctrl.loading = false;
            $ctrl.todoList.setError(error.message.split('\n'));
          });
    }

    function taskDoneChange(task) {
      $ctrl.loading = task._id;
      // Не показывать изменения пока не придет ответ от сервера
      task.done = !task.done;
      let updatedTask = Object.assign({}, task);
      updatedTask.done = !task.done;
      todoService.updateTask(updatedTask)
          .then((responseUpdatedTask) => {
            $ctrl.loading = false;
            task.done = !task.done;
          })
          .catch((error) => {
            $ctrl.loading = false;
            $ctrl.todoList.setError(error.message.split('\n'));
          });
    }

    function deleteTask(task) {
      $ctrl.loading = task._id;
      todoService.deleteTask(task._id)
          .then((deletedTaskId) => {
            $ctrl.loading = false;
            const index = $ctrl.tasks.indexOf(task);
            $ctrl.tasks.splice(index, 1);
          })
          .catch((error) => {
            $ctrl.loading = false;
            $ctrl.todoList.setError(error.message.split('\n'));
          });
    }
  }

})();
