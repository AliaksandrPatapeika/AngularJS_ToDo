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

    $ctrl.addTask = addTask;

    function addTask(taskText) {
      // не добавлять пустые задания
      if ($ctrl.addTaskInputText) {
        let newTask = {
          text: taskText,
          done: false,
          important: false,
          date: Date.now(),
          description: ""
        };
        todoService.addTask(newTask);
        $ctrl.addTaskInputText = '';
      } else {
        console.log('Empty input');
      }
    }

  }

})();
