'use strict';

describe('taskDetail component', function () {

  beforeEach(module('taskDetail'));

  // Тестирование контроллера
  describe('TaskDetailController', function () {
    let controllerInstance;
    let todoService;

    describe('Load data if getTaskById promise resolve', function () {
      const mockTask = {text: 'new fake task'};

      beforeEach(inject(function ($componentController, _todoService_) {
        // Создаем сервис
        todoService = _todoService_;
        spyOn(todoService, 'getTaskById').and.returnValue(Promise.resolve(mockTask));
        controllerInstance = $componentController('taskDetail');
      }));

      it('should create a `task` property when task data resolved from $resource promise', function (done) {
        // Проверяем, что свойства `task` и `error` не существуют в контроллере
        expect(controllerInstance.task).toBeUndefined();
        expect(controllerInstance.error).toBeUndefined();

        setTimeout(function () {
          expect(controllerInstance.task).toBeDefined();
          expect(controllerInstance.error).toBeUndefined();
          // Проверяем, что свойство `task` это объект
          expect(angular.isObject(controllerInstance.task)).toBe(true);
          expect(controllerInstance.task).toEqual(mockTask);
          done();
        }, 100);

      });

    });

    describe('Load data if getTaskById promise reject', function () {
      const mockError = new Error('Error!\nCode: 404\nStatus: not found');

      beforeEach(inject(function ($componentController, _todoService_) {
        // Создаем сервис
        todoService = _todoService_;
        spyOn(todoService, 'getTaskById').and.returnValue(Promise.reject(mockError));
        controllerInstance = $componentController('taskDetail');
      }));

      it('should create a `error` property when task data rejected from $resource promise', function (done) {
        // Проверяем, что свойства `task` и `error` не существуют в контроллере
        expect(controllerInstance.task).toBeUndefined();
        expect(controllerInstance.error).toBeUndefined();

        setTimeout(function () {
          expect(controllerInstance.task).toBeUndefined();
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

});
