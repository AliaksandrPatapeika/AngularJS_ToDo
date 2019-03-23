'use strict';

describe('TodoList', function () {
  // Все, что мы хотим протестировать, уже включено в модуль `todoList`
  // Загружаем модуль `todoList` (содержащий компонент `todoList` и фильтр `taskFilter`) перед каждым юнит тестом
  // в каждой группе тестов describe.
  // При этом Angular добавляет сервисы ($componentController, $filter и др.) в нашу тестовую функцию.
  beforeEach(module('todoList'));

  // Тестирование контроллера
  describe('Todo list controller test', function () {
    let controllerInstance;

    // `inject` предоставляет возможность использования внедрения зависимостей в тестах и выполнить функцию с
    // внедренными сервисами ($componentController, $filter и др.).
    // Инжектим сервис $componentController для извлечения и создания экземпляра контроллера компонента `todoList`.
    beforeEach(inject(function ($componentController) {
      controllerInstance = $componentController('todoList');
    }));

    it('should create a `data.taskList` model with 3 tasks', function () {
      expect(controllerInstance.data.taskList.length).toBe(3);
    });

    it('should add new two tasks to `data.taskList` model (5 tasks)', function () {
      controllerInstance.addTaskInputText = 'test task1';
      controllerInstance.addTask();
      controllerInstance.addTaskInputText = 'test task2';
      controllerInstance.addTask();
      expect(controllerInstance.data.taskList.length).toBe(5);
    });
  });

  // Тестирование фильтра
  describe('Task filter test', function () {
    let filterInstance;
    let model = {};

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

    it('should filter `data.taskList` model by `active` tasks (2 tasks)', function () {
      const result = filterInstance(model.taskList, 'active');
      expect(result.length).toBe(2);
    });

    it('should filter `data.taskList` model by `done` tasks (1 task)', function () {
      const result = filterInstance(model.taskList, 'done');
      expect(result.length).toBe(1);
    });

  });
});
