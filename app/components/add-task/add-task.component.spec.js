'use strict';

describe('addTask component', function () {

  beforeEach(module('addTask'));

  // Тестирование контроллера
  describe('AddTaskController', function () {
    let controllerInstance;
    let todoService;

    beforeEach(inject(function ($componentController, _todoService_) {
      // Создаем сервис
      todoService = _todoService_;
      let bindings = {
        tasks:
            [
              {text: 'learn AngularJS'},
              {text: 'build an AngularJS app'},
              {text: 'Other todo'}
            ]
      };
      controllerInstance = $componentController('addTask', null, bindings);
    }));

    it('should add new two tasks to `tasks` property (5 tasks) when task data resolved from $resource promise', function (done) {
      spyOn(todoService, 'addTask').and.returnValue(Promise.resolve({text: 'new fake task'}));
      expect(controllerInstance.tasks).toBeDefined();
      expect(controllerInstance.error).toBeUndefined();
      // addTaskInputText value need for add new task (do not add empty tasks)
      controllerInstance.addTaskInputText = 'task1';
      controllerInstance.addTask('task1');
      controllerInstance.addTaskInputText = 'task2';
      controllerInstance.addTask('task2');

      setTimeout(function() {
        expect(controllerInstance.tasks).toBeDefined();
        expect(controllerInstance.error).toBeUndefined();
        expect(angular.isArray(controllerInstance.tasks)).toBe(true);
        expect(controllerInstance.tasks.length).toBe(5);
        done();
      }, 100);

    });

    it('should create a `error` property when task data rejected from $resource promise', function (done) {
      let mockError = new Error('Error!\nCode: 404\nStatus: not found');
      spyOn(todoService, 'addTask').and.returnValue(Promise.reject(mockError));
      expect(controllerInstance.tasks).toBeDefined();
      expect(controllerInstance.error).toBeUndefined();
      // addTaskInputText value need for add new task (do not add empty tasks)
      controllerInstance.addTaskInputText = 'task1';
      controllerInstance.addTask('task1');

      setTimeout(function() {
        expect(controllerInstance.tasks).toBeDefined();
        expect(controllerInstance.error).toBeDefined();
        // Проверяем, что свойство `error` это массив
        expect(angular.isArray(controllerInstance.error)).toBe(true);
        // Проверяем, что свойство `error` это массив из строки сообщения объекта ошибки
        expect(controllerInstance.error).toEqual(mockError.message.split('\n'));
        done();
      }, 100);

    });

  });

});
