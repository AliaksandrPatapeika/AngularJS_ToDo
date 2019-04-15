'use strict';

describe('todoList component', function () {

  beforeEach(module('todoList'));

  // Тестирование контроллера
  describe('TodoListController', function () {
    let controllerInstance;
    let todoService;

    describe('Load data if getAllTasks promise resolve', function () {
      const mockTasks = [
        {text: 'learn AngularJS'},
        {text: 'build an AngularJS app'},
        {text: 'Other todo'}
      ];

      beforeEach(inject(function ($componentController, _todoService_) {
        todoService = _todoService_;
        spyOn(todoService, 'getAllTasks').and.returnValue(Promise.resolve(mockTasks));
        controllerInstance = $componentController('todoList');
      }));

      it('should create a `tasks` property with 3 tasks when tasks data resolved from $resource promise', function (done) {
        expect(controllerInstance.tasks).toBeUndefined();
        expect(controllerInstance.error).toBeUndefined();

        setTimeout(function () {
          expect(controllerInstance.tasks).toBeDefined();
          expect(controllerInstance.error).toBeUndefined();
          expect(angular.isArray(controllerInstance.tasks)).toBe(true);
          expect(controllerInstance.tasks).toEqual(mockTasks);
          expect(controllerInstance.tasks.length).toBe(3);
          done();
        }, 100);

      });

    });

    describe('Load data if getAllTasks promise reject', function () {
      const mockError = new Error('Error!\nCode: 404\nStatus: not found');

      beforeEach(inject(function ($componentController, _todoService_) {
        todoService = _todoService_;
        spyOn(todoService, 'getAllTasks').and.returnValue(Promise.reject(mockError));
        controllerInstance = $componentController('todoList');
      }));

      it('should create a `error` property when task data rejected from $resource promise', function (done) {
        expect(controllerInstance.tasks).toBeUndefined();
        expect(controllerInstance.error).toBeUndefined();

        setTimeout(function () {
          expect(controllerInstance.tasks).toBeUndefined();
          expect(controllerInstance.error).toBeDefined();
          expect(angular.isArray(controllerInstance.error)).toBe(true);
          expect(controllerInstance.error).toEqual(mockError.message.split('\n'));
          done();
        }, 100);

      });

    });

  });

});
