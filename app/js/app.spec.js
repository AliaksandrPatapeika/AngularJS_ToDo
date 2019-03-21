'use strict';

describe('TodoListController', function () {
  let mockScope = {};
  let controller;

  /* Перед каждым юнит тестом мы говорим Angular загружать модуль `todoListApp` для тестирования используя модуль
   `angular.mock`,
     т.е. просим Angular добавить сервис $controller в нашу тестовую функцию.
     В этом случае Angular предоставляет сервис $controller, который будет извлекать наш контроллер
     `TodoListController` по имени.
     Мы используем $controller для создания экземпляра `TodoListController`.
     С помощью этого экземпляра мы проверяем, что свойство массива заданий в scope содержит три записи. */
  beforeEach(angular.mock.module('todoListApp'));

  // `inject` предоставляет возможность использования внедрения зависимостей в тестах и выполнить функцию с
  // внедренными сервисами $controller и $rootScope.
  // $rootScope сервис используется для создания нового scope
  beforeEach(inject(function ($controller, $rootScope) {
    // создание нового фейкового scope для тестирования
    mockScope = $rootScope.$new();

    // сервис $controller испольльзуется для создания контроллера с именем `TodoListController`, который размещен в
    // модуле `todoListApp` и в качестве параметра передать в его $scope фейковый новый `mockScope`
    // метод принимает 2 аргумента имя контроллера и объект содержащий свойства, которые используются для разрешения зависимостей
    controller = $controller('TodoListController', {$scope: mockScope});
  }));

  it('should create a `data.taskList` model with 3 tasks', function () {
    expect(mockScope.data.taskList.length).toBe(3);
  });

  it('should add new two tasks to `data.taskList` model (5 tasks)', function () {
    mockScope.addTaskInputText = 'test task1';
    mockScope.addTask();
    mockScope.addTaskInputText = 'test task2';
    mockScope.addTask();
    expect(mockScope.data.taskList.length).toBe(5);
  });
});

describe('Task filter test', function () {
  let filterInstance;
  let model = {};

// загружаем модуль `todoListApp`
  beforeEach(angular.mock.module('todoListApp'));

  // инжектим сервис для работы с фильтрами $filter
  // и с посощью этого сервиса находим фильтр с именем `taskFilter`
  beforeEach(inject(function ($filter) {
    // получаем экземляр фильтра (получаем доступ к функции во втором параметре `todoListApp.filter('taskFilter', function () {}`)
    filterInstance = $filter('taskFilter');
    model = {
      taskList: [
        {text: 'learn AngularJS', done: true, important: false},
        {text: 'build an AngularJS app', done: false, important: false},
        {text: 'Other task', done: false, important: true}
      ]
    };
  }));

  it('should filter `data.taskList` model by `active` tasks (2 tasks)', inject(function () {
    const result = filterInstance(model.taskList, 'active');
    expect(Number(result.length)).toBe(2);
  }));

  it('should filter `data.taskList` model by `done` tasks (1 task)', inject(function () {
    const result = filterInstance(model.taskList, 'done');
    expect(Number(result.length)).toBe(1);
  }));

});
