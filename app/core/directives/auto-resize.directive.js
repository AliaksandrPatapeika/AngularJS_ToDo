(function () {
  'use strict';

  angular
      .module('core.todo')
      .directive('autoResize', autoResize);

  autoResize.$inject = ['$timeout'];

  function autoResize($timeout) {
    return {
      restrict: 'A',
      link: autoResizeLink
    };

    function autoResizeLink(scope, element) {
      element.css({'height': 'auto', 'overflow-y': 'hidden'});
      $timeout(function () {
        element.css('height', element[0].scrollHeight + 'px');
      });

      element.on('input', function () {
        element.css({'height': 'auto', 'overflow-y': 'hidden'});
        element.css('height', element[0].scrollHeight + 'px');
      });
    }
  }

})();
