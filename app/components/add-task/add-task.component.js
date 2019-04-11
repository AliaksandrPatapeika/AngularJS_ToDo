(function () {
  'use strict';

  angular
      .module('addTask')
      .component('addTask', {
        templateUrl: 'components/add-task/add-task.template.html',
        controller: AddTaskController,
        bindings: {
          tasks: '<'
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
      // не добавлять пустые задания
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
            .then((response) => {
              $ctrl.loading = false;
              $ctrl.tasks.push(response);
            });
      } else {
        console.log('Empty input');
      }
    }

  }

})();
