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
      let newTask = {
              id: todoService.generateId(),
              text: taskText,
              done: false,
              important: false,
              date: Date.now(),
              description: ""
            };
      // не добавлять пустые задания
      if ($ctrl.addTaskInputText) {
        todoService.addTask(newTask);
        $ctrl.addTaskInputText = '';
      } else {
        console.log('Empty input');
      }
    }

  }

})();
