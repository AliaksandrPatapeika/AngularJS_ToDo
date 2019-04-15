'use strict';

describe('taskItem component', function () {
  // Все, что мы хотим протестировать, уже включено в модуль `taskItem`
  // Загружаем модуль `taskItem` (содержащий компонент `taskItem` и фильтр `taskList`) перед каждым юнит тестом
  // в каждой группе тестов describe.
  // При этом Angular добавляет сервисы ($componentController, $filter, $httpBackend и др.) в нашу тестовую функцию.
  beforeEach(module('taskItem'));

   // Тестирование фильтра
  describe('taskList filter', function () {
    let filterInstance;
    let tasks = [];

    // функция inject(function (taskListFilter) {}), предоставляет доступ к фильтру, который мы хотим
    // протестировать. Нужно добавить суффикс `Filter` к имени фильтра.
    beforeEach(inject(function (taskListFilter) {
      // получаем экземляр фильтра (получаем доступ к функции во втором параметре `.filter('taskList', function () {}` в модуле `todoList`)
      filterInstance = taskListFilter;
      tasks = [
        {text: 'learn AngularJS', done: true, important: false},
        {text: 'build an AngularJS app', done: false, important: false},
        {text: 'Other todo', done: false, important: true}
      ]
    }));

    it('should filter tasks by `active` tasks (2 tasks)', function () {
      expect(filterInstance(tasks, 'active').length).toBe(2);
    });

    it('should filter tasks by `done` tasks (1 todo)', function () {
      expect(filterInstance(tasks, 'done').length).toBe(1);
    });

    it('should filter tasks by `all` tasks (3 tasks)', function () {
      expect(filterInstance(tasks, 'all').length).toBe(3);
    });

  });

});
