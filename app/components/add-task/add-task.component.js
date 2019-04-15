(function () {
  'use strict';

  angular
      .module('addTask')
      .component('addTask', {
        templateUrl: 'components/add-task/add-task.template.html',
        controller: AddTaskController,
        bindings: {
          tasks: '<',
          error: '='
        }
      });

  AddTaskController.$inject = ['todoService'];

  function AddTaskController(todoService) {
    let $ctrl = this;

    init();

    function init() {
      $ctrl.loading = false;
      $ctrl.addTask = addTask;
    }

    function addTask(taskText) {
      // do not add empty tasks
      if ($ctrl.addTaskInputText) {
        $ctrl.loading = true;
        let newTask = {
          text: taskText,
          done: false,
          important: false,
          date: new Date().toISOString(),
          description: ""
        };
        $ctrl.addTaskInputText = '';
        todoService.addTask(newTask)
            .then((responseNewTask) => {
              $ctrl.loading = false;
              $ctrl.tasks.push(responseNewTask);
            })
            .catch((error) => {
              $ctrl.loading = false;
              $ctrl.error = error.message.split('\n');
            });
      } else {
        console.log('Empty input');
      }

    }

  }

})();
