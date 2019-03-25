'use strict';

describe('todoList component', function () {
  // Все, что мы хотим протестировать, уже включено в модуль `todoList`
  // Загружаем модуль `todoList` (содержащий компонент `todoList` и фильтр `taskFilter`) перед каждым юнит тестом
  // в каждой группе тестов describe.
  // При этом Angular добавляет сервисы ($componentController, $filter, $httpBackend и др.) в нашу тестовую функцию.
  beforeEach(module('todoList'));

  // Тестирование контроллера
  describe('TodoListController test', function () {
    let controllerInstance;
    let $httpBackend;

    // `inject` предоставляет возможность использования внедрения зависимостей в тестах и выполнить функцию с
    // внедренными экземплярами сервисов ($componentController, $filter, $httpBackend и др.) в функцию beforeEach().
    // Это гарантирует, что каждый тест изолирован от работы, выполненной в других тестах.
    // Инжектим сервис $componentController для извлечения и создания экземпляра контроллера компонента `todoList`.
    // Инжектор игнорирует начальные и конечные подчеркивания в `_$httpBackend_`.
    // Это позволяет внедрить сервис и назначить его переменной с тем же именем
    // как сервис, избегая конфликта имен.
    beforeEach(inject(function ($componentController, _$httpBackend_) {
      // Фиктивный $http сервис для юнит тестов
      $httpBackend = _$httpBackend_;
      // Настраиваем поддельные ответы на запросы сервера
      $httpBackend.expectGET('tasks/tasks.json')
          .respond(
              [
                {text: 'learn AngularJS', done: true, important: false},
                {text: 'build an AngularJS app', done: false, important: false},
                {text: 'Other task', done: false, important: true}
              ]
          );
      // создания экземпляр контроллера компонента `todoList`
      controllerInstance = $componentController('todoList');
    }));

    it('should create a `tasks` property with 3 tasks fetched with `$http`', function () {
      // Проверяем, что свойство `tasks` не существует в контроллере до получения ответа от сервиса $http
      expect(controllerInstance.tasks).toBeUndefined();
      // Ответы от сервиса `$httpBackend` не возвращаются, пока не будет вызван метод $httpBackend.flush() (явно
      // сбрасываются ожидающие запросы). Это сохраняет асинхронным API бэкэнда, позволяя тесту выполняться
      // синхронно. При этом очищается очередь запросов в браузере, вследствии чего promise, который возвращает
      // сервис $http, будет разрешен с помощью поддельного ответа.
      $httpBackend.flush();
      // Проверяем, что свойство `tasks` теперь существует в контроллере
      expect(controllerInstance.tasks.length).toBe(3);

      expect(controllerInstance.tasks).toEqual([
        {text: 'learn AngularJS', done: true, important: false},
        {text: 'build an AngularJS app', done: false, important: false},
        {text: 'Other task', done: false, important: true}
      ]);
    });

    it('should add new two tasks to `tasks` property (5 tasks)', function () {
      $httpBackend.flush();
      controllerInstance.addTaskInputText = 'test task1';
      controllerInstance.addTask();
      controllerInstance.addTaskInputText = 'test task2';
      controllerInstance.addTask();
      expect(controllerInstance.tasks.length).toBe(5);
    });

  });

  // Тестирование фильтра
  describe('taskFilter test', function () {
    let filterInstance;
    let tasks = [];

    // инжектим сервис для работы с фильтрами $filter
    // и с посощью этого сервиса находим фильтр с именем `taskFilter`
    beforeEach(inject(function ($filter) {
      // получаем экземляр фильтра (получаем доступ к функции во втором параметре `.filter('taskFilter', function ()
      // {}` в модкле `todoList`)
      filterInstance = $filter('taskFilter');
      tasks = [
          {text: 'learn AngularJS', done: true, important: false},
          {text: 'build an AngularJS app', done: false, important: false},
          {text: 'Other task', done: false, important: true}
        ]
    }));

    it('should filter tasks by `active` tasks (2 tasks)', function () {
      const result = filterInstance(tasks, 'active');
      expect(result.length).toBe(2);
    });

    it('should filter tasks by `done` tasks (1 task)', function () {
      const result = filterInstance(tasks, 'done');
      expect(result.length).toBe(1);
    });

    it('should filter tasks by `all` tasks (3 tasks)', function () {
      const result = filterInstance(tasks, 'all');
      expect(result.length).toBe(3);
    });

  });

});
