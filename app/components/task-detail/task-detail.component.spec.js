'use strict';

describe('taskDetail component', function () {

  // Загружаем модуль `taskDetail` (содержащий компонент `taskDetail`) перед каждым юнит тестом
  beforeEach(module('taskDetail'));

  // Тестирование контроллера
  describe('TaskDetailController test', function () {
    let controllerInstanceResolve;
    let controllerInstanceReject;
    const mockTaskDataResolve = {id: '_xyzId', text: 'build an AngularJS app'};
    const mockTaskDataReject = new Error('Error \nPromise rejected!');

    beforeEach(inject(function ($componentController) {
      // создания экземпляр контроллера компонента `taskDetail`
      controllerInstanceResolve = $componentController('taskDetail', null, {taskPromise: mockTaskDataResolve});
      controllerInstanceReject = $componentController('taskDetail', null, {taskPromise: mockTaskDataReject});
    }));

    it('should create a `task` property when task data resolved from $resource promise', function () {
      // Проверяем, что свойство `task` существует в контроллере после получения контроллером привязки к
      // свойству `taskPromise` от сервиса $routeProvider в resolve в app.config.js
      expect(controllerInstanceResolve.taskPromise).toBeDefined();
      expect(controllerInstanceResolve.task).toBeDefined();
      expect(controllerInstanceResolve.error).toBeUndefined();

      // Проверяем, что свойство `taskPromise` это не ошибка
      expect(controllerInstanceResolve.taskPromise instanceof Error).toBe(false);
      // Проверяем, что свойство `task` это объект
      expect(angular.isObject(controllerInstanceResolve.task)).toBe(true);
      expect(controllerInstanceResolve.task).toBe(mockTaskDataResolve);
      expect(controllerInstanceResolve.task).toEqual({id: '_xyzId', text: 'build an AngularJS app'});
    });

    it('should create a `error` property when task data rejected from $resource promise', function () {
      // Проверяем, что свойство `error` существует в контроллере после получения ошибки контроллером при
      // выполнении привязки к свойству `taskPromise` от сервиса $routeProvider в resolve в app.config.js
      expect(controllerInstanceReject.taskPromise).toBeDefined();
      expect(controllerInstanceReject.task).toBeUndefined();
      expect(controllerInstanceReject.error).toBeDefined();

      // Проверяем, что свойство `taskPromise` это ошибка
      expect(controllerInstanceReject.taskPromise instanceof Error).toBe(true);
      // Проверяем, что свойство `error` это массив из строки сообщения объекта ошибки
      expect(controllerInstanceReject.error).toEqual(controllerInstanceReject.taskPromise.message.split('\n'));
    });

  });

});
