'use strict';
// убеждаемся, что наш новый сервис выдает HTTP-запросы и возвращает ожидаемые «будущие» объекты / массивы.
describe('todoService', function () {

  // Загружаем модуль, который содержит сервис `todoService` перед каждым тестом
  beforeEach(module('core.todo'));

  describe('get data with $resource services', function () {
    let todoService;
    let $httpBackend;
    let restdb;
    const mockTasksData = [
      {id: '_d05295jg7', text: 'Task 1'},
      {id: '_x0h29fnbi', text: 'Task 2'},
      {id: '_0h2dj54b4', text: 'Task 3'}
    ];
    const mockTask = {id: '_x0h29fnbi', text: 'Task 2'};
    // Добавить jasmine `custom equality tester` перед каждым тестом
    // angular.equals игнорирует функции и свойства с префиксом `$`, например, добавленные сервисом `$resource`.
    beforeEach(function () {
      jasmine.addCustomEqualityTester(angular.equals);
    });

    beforeEach(inject(function (_todoService_, _$httpBackend_, _restdb_) {
      // Создаем сервис
      todoService = _todoService_;
      // Фиктивный $http сервис для юнит тестов
      $httpBackend = _$httpBackend_;
      restdb = _restdb_;
    }));

// Проверяем, что нет невыполненых ожиданий или запросов после каждого теста.
//   Здесь мы используем методы $httpBackend verifyNoOutstandingExpectation() и verifyNoOutstandingRequest() для проверки того, что все ожидаемые запросы были отправлены и что дополнительный запрос не запланирован на потом.
    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    // does the service exist?
    it('exists', function() {
      expect(!!todoService).toBe(true);
    });

    it('getAllTasks (should fetch the tasks data from `restdb` server)', function () {
      let taskUrl = `https://${restdb.databaseName}.restdb.io/rest/${restdb.collectionName}?apikey=${restdb.apikey}`;
      // Настраиваем поддельные ответы на запросы сервера
      $httpBackend.expectGET(taskUrl).respond(mockTasksData);

      todoService.getAllTasks()
          .then((tasks) => {
            expect(tasks).toEqual(mockTasksData);
          })
          .catch((error) => {
            expect(error).toBeUndefined();
          });

      $httpBackend.flush();

    });

    it('getTaskById (should fetch the task data from from `restdb` server by taskId)', function () {
      let taskID = '_x0h29fnbi';
      let taskUrl = `https://${restdb.databaseName}.restdb.io/rest/${restdb.collectionName}/${taskID}?apikey=${restdb.apikey}`;
      // Настраиваем поддельные ответы на запросы сервера
      $httpBackend.expectGET(taskUrl).respond(mockTask);

      todoService.getTaskById(taskID)
          .then((task) => {
            expect(task).toEqual(mockTask);
          })
          .catch((error) => {
            expect(error).toBeUndefined();
          });

      $httpBackend.flush();

    });

  });

});
