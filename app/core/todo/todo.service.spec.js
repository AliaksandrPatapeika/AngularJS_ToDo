'use strict';
// убеждаемся, что наш новый сервис выдает HTTP-запросы и возвращает ожидаемые «будущие» объекты / массивы.
describe('todoService', function () {
  let todoService;

  // Загружаем модуль, который содержит сервис `todoService` перед каждым тестом
  beforeEach(module('core.todo'));

  // Создаем сервис
  beforeEach(inject(function (_todoService_) {
    todoService = _todoService_;
  }));

  describe('get data with $resource services', function () {
    let $httpBackend;
    const mockTasksData = [
      {id: '_d05295jg7', text: 'Task 1'},
      {id: '_x0h29fnbi', text: 'Task 2'},
      {id: '_0h2dj54b4', text: 'Task 3'}
    ];
    // Добавить jasmine `custom equality tester` перед каждым тестом
    // Если бы мы использовали стандартное сопоставление jasmine `.toEqual()`, наши тесты были бы неудачными, потому что значения тестов не точно соответствовали бы ответам.
    // Чтобы решить эту проблему, мы даем команду jasmine использовать собственный тестер равенства для сравнения
    // объектов. В качестве нашего тестера на равенство мы указываем angular.equals, который игнорирует функции и
    // свойства с префиксом `$`, например, добавленные сервисом `$resource`.
    beforeEach(function () {
      jasmine.addCustomEqualityTester(angular.equals);
    });

    // "обучаем" `$httpBackend` перед каждым тестом
    beforeEach(inject(function (_$httpBackend_) {
      // Фиктивный $http сервис для юнит тестов
      $httpBackend = _$httpBackend_;
      // Настраиваем поддельные ответы на запросы сервера
      $httpBackend.expectGET('data/tasks.json').respond(mockTasksData);
    }));

// Проверяем, что нет невыполненых ожиданий или запросов после каждого теста.
//   Здесь мы используем методы $httpBackend verifyNoOutstandingExpectation() и verifyNoOutstandingRequest() для проверки того, что все ожидаемые запросы были отправлены и что дополнительный запрос не запланирован на потом.
    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('getAllTasks (should fetch the tasks data from `/data/tasks.json`)', function () {
      todoService.getAllTasks()
          .then((tasks) => {
            expect(tasks).toEqual(mockTasksData);
          })
          .catch((error) => {
            expect(error).toBeUndefined();
          });

      $httpBackend.flush();

    });

    it('getTaskById (should fetch the task data from `/data/tasks.json` by taskId)', function () {
      todoService.getTaskById('_x0h29fnbi')
          .then((task) => {
            expect(task).toEqual({id: '_x0h29fnbi', text: 'Task 2'});
          })
          .catch((error) => {
            expect(error).toBeUndefined();
          });

      $httpBackend.flush();

    });

  });

  it('generateId (should generate unique Id)', function () {
    let res = [];

    function hasDuplicates(array) {
      return (new Set(array)).size !== array.length;
    }
    
    for (let i = 0; i < 50; i++) {
      res.push(todoService.generateId());
    }

    expect(res.length).toBe(50);

    expect(hasDuplicates(res)).toBe(false);

    res.forEach(function(id) {
      expect(id).toMatch(/^_[a-z0-9]{9}$/);
    });

  });

});
