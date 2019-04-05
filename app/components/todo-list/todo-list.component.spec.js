'use strict';

describe('todoList component', function () {

  beforeEach(module('todoList'));

  // Тестирование контроллера
  describe('TodoListController test', function () {
    let controllerInstanceResolve;
    let controllerInstanceReject;
    const mockTasksDataResolve = [
      {text: 'learn AngularJS', done: true, important: false},
      {text: 'build an AngularJS app', done: false, important: false},
      {text: 'Other todo', done: false, important: true}
    ];
    const mockTasksDataReject = new Error('Error \nPromise rejected!');

    // `inject` предоставляет возможность использования внедрения зависимостей в тестах и выполнить функцию с
    // внедренными экземплярами сервисов ($componentController, $filter, $httpBackend и др.) в функцию beforeEach().
    // Это гарантирует, что каждый тест изолирован от работы, выполненной в других тестах.
    // Инжектим сервис $componentController для извлечения и создания экземпляра контроллера компонента `todoList`.
    // Инжектор игнорирует начальные и конечные подчеркивания в `_$httpBackend_`.
    // Это позволяет внедрить сервис и назначить его переменной с тем же именем
    // как сервис, избегая конфликта имен.
    // beforeEach(inject(function ($componentController, _$httpBackend_, _todoService_) {
    beforeEach(inject(function ($componentController) {
      // создания экземпляр контроллера компонента `todoList`
      controllerInstanceResolve = $componentController('todoList', null, {tasksPromise: mockTasksDataResolve});
      controllerInstanceReject = $componentController('todoList', null, {tasksPromise: mockTasksDataReject});
    }));

    it('should create a `tasks` property with 3 tasks when tasks data resolved from $resource promise', function () {
      // Проверяем, что свойство `tasks` существует в контроллере после получения контроллером привязки к
      // свойству `tasksPromise` от сервиса $routeProvider в resolve в app.config.js
      expect(controllerInstanceResolve.tasksPromise).toBeDefined();
      expect(controllerInstanceResolve.tasks).toBeDefined();
      expect(controllerInstanceResolve.error).toBeUndefined();

      // Проверяем, что свойство `tasksPromise` это не ошибка
      expect(controllerInstanceResolve.tasksPromise instanceof Error).toBe(false);
      // Проверяем, что свойство `tasks` это массив с тремя значениями
      expect(angular.isArray(controllerInstanceResolve.tasks)).toBe(true);
      expect(controllerInstanceResolve.tasks).toBe(mockTasksDataResolve);
      expect(controllerInstanceResolve.tasks.length).toBe(3);
    });

    it('should create a `error` property when tasks data rejected from $resource promise', function () {
      // Проверяем, что свойство `error` существует в контроллере после получения ошибки контроллером при
      // выполнении привязки к свойству `tasksPromise` от сервиса $routeProvider в resolve в app.config.js
      expect(controllerInstanceReject.tasksPromise).toBeDefined();
      expect(controllerInstanceReject.tasks).toBeUndefined();
      expect(controllerInstanceReject.error).toBeDefined();

      // Проверяем, что свойство `tasksPromise` это ошибка
      expect(controllerInstanceReject.tasksPromise instanceof Error).toBe(true);
      // Проверяем, что свойство `error` это массив из строки сообщения объекта ошибки
      expect(controllerInstanceReject.error).toEqual(controllerInstanceReject.tasksPromise.message.split('\n'));
    });

  });

});
