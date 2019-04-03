'use strict';

describe('addTask component', function () {

  beforeEach(module('addTask'));

  // Тестирование контроллера
  describe('AddTaskController test', function () {
    let controllerInstance;

    beforeEach(inject(function ($componentController) {
      let bindings = {
        tasks:
            [
              {text: 'learn AngularJS', done: true, important: false},
              {text: 'build an AngularJS app', done: false, important: false},
              {text: 'Other todo', done: false, important: true}
            ]
      };
      controllerInstance = $componentController('addTask', null, bindings);
    }));


    it('should add new two tasks to `tasks` property (5 tasks)', function () {
      controllerInstance.addTaskInputText = 'test task1';
      controllerInstance.addTask();
      controllerInstance.addTaskInputText = 'test task2';
      controllerInstance.addTask();
      expect(controllerInstance.tasks.length).toBe(5);
    });

  });

});
