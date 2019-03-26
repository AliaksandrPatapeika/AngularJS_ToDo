'use strict';

describe('taskDetail component', function () {

  // Загружаем модуль `taskDetail` (содержащий компонент `taskDetail`) перед каждым юнит тестом
  beforeEach(module('taskDetail'));

  // Тестирование контроллера
  describe('TaskDetailController test', function () {
    let controllerInstance;
    let $httpBackend;

    beforeEach(inject(function ($componentController, _$httpBackend_, $routeParams) {
      // Фиктивный $http сервис для юнит тестов
      $httpBackend = _$httpBackend_;
      // Настраиваем поддельные ответы на запросы сервера
      $httpBackend.expectGET('tasks/tasks.json').respond(
          [
            {id: '_01rfgt', text: 'learn AngularJS'},
            {id: '_xyzId', text: 'build an AngularJS app'},
            {id: '_dh6s5', text: 'Other task'}
          ]
      );
      $routeParams.taskId = '_xyzId';
      // создания экземпляр контроллера компонента `taskDetail`
      controllerInstance = $componentController('taskDetail');
    }));

    it('should fetch the task details', function () {
      jasmine.addCustomEqualityTester(angular.equals);
      // Текущее задание для task detail view
      expect(controllerInstance.task).toBeUndefined();
      // Ответы от сервиса `$httpBackend` не возвращаются, пока не будет вызван метод $httpBackend.flush() (явно
      // сбрасываются ожидающие запросы). Это сохраняет асинхронным API бэкэнда, позволяя тесту выполняться
      // синхронно. При этом очищается очередь запросов в браузере, вследствии чего promise, который возвращает
      // сервис $http, будет разрешен с помощью поддельного ответа.
      $httpBackend.flush();
      expect(controllerInstance.task).toEqual({id: '_xyzId', text: 'build an AngularJS app'});
    });

  });

});
