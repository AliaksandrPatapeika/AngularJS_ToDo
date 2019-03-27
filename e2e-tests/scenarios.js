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
      // Turns off ng-animate animations for all elements in the
      element(by.css('body')).allowAnimations(false);
    });

    it('should filter the task list as a user types into the search box', function () {
      // Получить массив из элементов `li` внутри ng-repeat
      const taskList = element.all(by.repeater('task in $ctrl.tasks'));
      // Получить элемент (input) с ng-model="$ctrl.searchTask.text"
      const search = element(by.model('$ctrl.searchTask.text'));

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
      // Получить элемент (input) с ng-model="$ctrl.searchTask.text"
      const search = element(by.model('$ctrl.searchTask.text'));
      // Ввод текста в элемент `search`
      search.sendKeys('angular');

      element.all(by.css('.task-list .task-list-item .btn-info')).last().click();
      expect(browser.getCurrentUrl()).toContain('index.html#!/tasks/_x0h29fnbi');
    });

  });

  describe('View: Task detail', function() {

    beforeEach(function() {
      browser.get('index.html#!/tasks/_0yjrvtjof');
    });

    it('should display the `learn AngularJS` task detail page', function() {
      // найти элемент по текстовой привязке (<dd>{{$ctrl.task.text}}</dd>) и получить текст элемента
      expect(element(by.binding('$ctrl.task.text')).getText()).toBe('learn AngularJS');
    });

  });

});
