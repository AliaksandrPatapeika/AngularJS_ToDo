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
            {id: '_01rfgt', text: 'learn AngularJS', done: true, important: false},
            {is: '_xyzId', text: 'build an AngularJS app', done: false, important: false},
            {id: '_dh6s5', text: 'Other task', done: false, important: true}
          ]
      );
      $routeParams.taskId = '_xyzId';
      // создания экземпляр контроллера компонента `taskDetail`
      controllerInstance = $componentController('taskDetail');
    }));

    it('should fetch the task details', function () {

      // Текущее задание для task detail view
      expect(controllerInstance.task).toBeUndefined();
      // Ответы от сервиса `$httpBackend` не возвращаются, пока не будет вызван метод $httpBackend.flush() (явно
      // сбрасываются ожидающие запросы). Это сохраняет асинхронным API бэкэнда, позволяя тесту выполняться
      // синхронно. При этом очищается очередь запросов в браузере, вследствии чего promise, который возвращает
      // сервис $http, будет разрешен с помощью поддельного ответа.
      $httpBackend.flush();
      expect(controllerInstance.task).toEqual('build an AngularJS app');
    });

  });

});
