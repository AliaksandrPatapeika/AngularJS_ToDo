(function () {
  'use strict';

  angular.element(document).ready(() => {
    // на каком корневом элементе (`document`) запускается приложение
    angular.bootstrap(document, ['todoListApp']);
  });

})();
