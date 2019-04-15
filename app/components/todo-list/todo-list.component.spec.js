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

      // `inject` предоставляет возможность использования внедрения зависимостей в тестах и выполнить функцию с
      // внедренными экземплярами сервисов ($componentController, $filter, $httpBackend и др.) в функцию beforeEach().
      // Это гарантирует, что каждый тест изолирован от работы, выполненной в других тестах.
      // Инжектим сервис $componentController для извлечения и создания экземпляра контроллера компонента `todoList`.
      // Инжектор игнорирует начальные и конечные подчеркивания в `_$httpBackend_`.
      // Это позволяет внедрить сервис и назначить его переменной с тем же именем
      // как сервис, избегая конфликта имен.
      beforeEach(inject(function ($componentController, _todoService_) {
        // Создаем сервис
        todoService = _todoService_;
        spyOn(todoService, 'getAllTasks').and.returnValue(Promise.resolve(mockTasks));
        controllerInstance = $componentController('todoList');
      }));

      it('should create a `tasks` property with 3 tasks when tasks data resolved from $resource promise', function (done) {
        // Проверяем, что свойства `tasks` и `error` не существуют в контроллере
        expect(controllerInstance.tasks).toBeUndefined();
        expect(controllerInstance.error).toBeUndefined();

        setTimeout(function () {
          expect(controllerInstance.tasks).toBeDefined();
          expect(controllerInstance.error).toBeUndefined();
          // Проверяем, что свойство `tasks` это массив с тремя значениями
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
        // Создаем сервис
        todoService = _todoService_;
        spyOn(todoService, 'getAllTasks').and.returnValue(Promise.reject(mockError));
        controllerInstance = $componentController('todoList');
      }));

      it('should create a `error` property when task data rejected from $resource promise', function (done) {
        // Проверяем, что свойства `tasks` и `error` не существуют в контроллере
        expect(controllerInstance.tasks).toBeUndefined();
        expect(controllerInstance.error).toBeUndefined();

        setTimeout(function () {
          expect(controllerInstance.tasks).toBeUndefined();
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
