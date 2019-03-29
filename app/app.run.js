(function () {
  'use strict';

  // `ручной` запуск приложения без использования директивы ngApp
  angular.element(document).ready(() => {
    // на каком корневом элементе (`document`) запускается приложение (модуль `todoListApp`)
    angular.bootstrap(document, ['todoListApp']);
  });

})();
