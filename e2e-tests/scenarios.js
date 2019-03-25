'use strict';

// AngularJS E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('TodoList Application', function () {

  it('should redirect `index.html` to `index.html#!/tasks', function() {
    browser.get('index.html');
    expect(browser.getCurrentUrl()).toContain('index.html#!/tasks');
  });

  describe('View: Todo list', function() {

    beforeEach(function () {
      browser.get('index.html#!/tasks');
    });

    it('should filter the task list as a user types into the search box', function () {
      // Получить массив из элементов `li` внутри ng-repeat
      const taskList = element.all(by.repeater('task in $ctrl.tasks'));
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

    it('should be possible to filter task list via the filter buttons group', function () {
      // кнопка `All`
      const filterButtonAll = element(by.css('label[for="radioAll"]'));
      // кнопка `Active`
      const filterButtonActive = element(by.css('label[for="radioActive"]'));
      // кнопка `Done`
      const filterButtonDone = element(by.css('label[for="radioDone"]'));
      // Получить массив из элементов `li` внутри ng-repeat
      const taskList = element.all(by.repeater('task in $ctrl.tasks'));

      // Получить массив из текстовых значений элементов span из массива элементов списка заданий
      function getTaskTextList() {
        return taskList.map(function (task) {
          return task.element(by.css('label span')).getText();
        });
      }

      filterButtonActive.click();

      expect(getTaskTextList()).toEqual([
        'build an AngularJS app',
        'Other task'
      ]);

      filterButtonDone.click();

      expect(getTaskTextList()).toEqual([
        'learn AngularJS'
      ]);

      filterButtonAll.click();

      expect(getTaskTextList()).toEqual([
        'learn AngularJS',
        'build an AngularJS app',
        'Other task'
      ]);

    });

    it('should render task specific links', function() {
      // Получить элемент (input) с ng-model="$ctrl.searchTaskInputText"
      const search = element(by.model('$ctrl.searchTaskInputText'));
      // Ввод текста в элемент `search`
      search.sendKeys('angular');

      element.all(by.css('.task_item_list .task_item .btn-info')).last().click();
      expect(browser.getCurrentUrl()).toContain('index.html#!/tasks/_x0h29fnbi');
    });

  });

  describe('View: Task detail', function() {

    beforeEach(function() {
      browser.get('index.html#!/tasks/_4v27mqm1y');
    });

    it('should display placeholder page with `phoneId`', function() {
      // найти элемент по текстовой привязке (<span>{{$ctrl.taskId}}</span>) и получить текст элемента
      expect(element(by.binding('$ctrl.taskId')).getText()).toBe('_4v27mqm1y');
    });

  });

});
