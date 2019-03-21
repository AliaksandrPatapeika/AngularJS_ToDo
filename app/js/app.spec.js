'use strict';

describe('TodoListController', function () {
  /* Перед каждым тестом мы говорим Angular загружать модуль `todoListApp`,
     т.е. просим Angular добавить сервис $controller в нашу тестовую функцию.
     В этом случае Angular предоставляет сервис $controller, который будет извлекать наш контроллер
     `TodoListController` по имени.
     Мы используем $controller для создания экземпляра `TodoListController`.
     С помощью этого экземпляра мы проверяем, что свойство массива заданий в scope содержит три записи. */
  beforeEach(module('todoListApp'));

  it('should create a `data.taskList` model with 3 tasks', inject(function ($controller) {
    const scope = {};
    const ctrl = $controller('TodoListController', {$scope: scope});

    expect(scope.data.taskList.length).toBe(3);
  }));

});
