'use strict';

// AngularJS E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('TodoList', function () {

  beforeEach(function () {
    browser.get('index.html');
  });

  it('should filter the task list as a user types into the search box', function () {
    // Получить массив элементов внутри ng-repeat
    const taskList = element.all(by.repeater('task in $ctrl.data.taskList'));
    // Получить элемент (input) с ng-model="$ctrl.searchTaskInputText"
    const search = element(by.model('$ctrl.searchTaskInputText'));

    // Проверяем, что в списке задач есть только 3 элемента
    expect(taskList.count()).toBe(3);

    // Ввод текста в элемент `search`
    search.sendKeys('task');
    expect(taskList.count()).toBe(1);

    search.clear();
    search.sendKeys('angular');
    expect(taskList.count()).toBe(2);
  });
});
