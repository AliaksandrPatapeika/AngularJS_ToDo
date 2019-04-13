(function () {
  'use strict';

  angular
      .module('core.todo')
      .directive('autoResize', autoResize);

  autoResize.$inject = ['$timeout', '$window'];

  function autoResize($timeout, $window) {
    return {
      restrict: 'A',
      link: autoResizeLink
    };

    function autoResizeLink(scope, element) {
      // on init data
      element.css({'height': '0', 'overflow-y': 'hidden'});
      $timeout(function () {
        element.css('height', element[0].scrollHeight + 'px');
        // set focus on init
        element[0].focus();
      });

      // on input text
      element.on('input', function () {
        element.css({'height': '0', 'overflow-y': 'hidden'});
        element.css('height', element[0].scrollHeight + 'px');
      });

      // on window resize
      angular.element($window).bind('resize', function () {
        element.css({'height': '0', 'overflow-y': 'hidden'});
        element.css('height', element[0].scrollHeight + 'px');
      });

    }
  }

})();
