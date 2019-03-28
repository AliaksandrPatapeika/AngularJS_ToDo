'use strict';
// убеждаемся, что наш новый сервис выдает HTTP-запросы и возвращает ожидаемые «будущие» объекты / массивы.
describe('todoService', function () {
  let $httpBackend;
  let todoService;
  const tasksData = [
    {text: 'Task 1'},
    {text: 'Task 2'},
    {text: 'Task 3'}
  ];

  // Добавить jasmine `custom equality tester` перед каждым тестом
  // Если бы мы использовали стандартное сопоставление jasmine `.toEqual()`, наши тесты были бы неудачными, потому что значения тестов не точно соответствовали бы ответам.
  // Чтобы решить эту проблему, мы даем команду jasmine использовать собственный тестер равенства для сравнения
  // объектов. В качестве нашего тестера на равенство мы указываем angular.equals, который игнорирует функции и
  // свойства с префиксом `$`, например, добавленные сервисом `$resource`.
  beforeEach(function () {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Загружаем модуль, который содержит сервис `Task` перед каждым тестом
  beforeEach(module('core.todo'));

  // Создаем сервис и "обучаем" `$httpBackend` перед каждым тестом
  beforeEach(inject(function (_$httpBackend_, _todoService_) {
    // Фиктивный $http сервис для юнит тестов
    $httpBackend = _$httpBackend_;
    // Настраиваем поддельные ответы на запросы сервера
    $httpBackend.expectGET('data/tasks.json').respond(tasksData);

    todoService = _todoService_;
  }));

// Проверяем, что нет невыполненых ожиданий или запросов после каждого теста.
//   Здесь мы используем методы $httpBackend verifyNoOutstandingExpectation() и verifyNoOutstandingRequest() для проверки того, что все ожидаемые запросы были отправлены и что дополнительный запрос не запланирован на потом.
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the data data from `/data/tasks.json`', function () {
    const tasks = todoService.getTaskList().query();

    expect(tasks).toEqual([]);

    $httpBackend.flush();
    expect(tasks).toEqual(tasksData);
  });

});
