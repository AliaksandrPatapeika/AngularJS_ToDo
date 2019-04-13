(function () {
  'use strict';

  angular
      .module('editText')
      .component('editText', {
        templateUrl: 'components/edit-text/edit-text.template.html',
        controller: EditTextController,
        bindings: {
          task: '<',
          text: '=',
          error: '='
        }
      });

  EditTextController.$inject = ['todoService'];

  function EditTextController(todoService) {
    let $ctrl = this;

    init();

    function init() {
      $ctrl.loading = false;
      $ctrl.mode = 'viewText';
      $ctrl.edit = edit;
      $ctrl.save = save;
      $ctrl.cancel = cancel;
    }

    function edit(storeText) {
      $ctrl.storeText = storeText;
      $ctrl.mode = 'editText';
    }

    function save() {
      $ctrl.loading = true;
      todoService.updateTask($ctrl.task)
          .then((responseUpdatedTask) => {
            $ctrl.loading = false;
            $ctrl.mode = 'viewText';
          })
          .catch((error) => {
            $ctrl.loading = false;
            $ctrl.error = error.message.split('\n');
          });
    }

    function cancel() {
      if ($ctrl.text !== $ctrl.storeText) {
        $ctrl.text = $ctrl.storeText;
      }

      $ctrl.mode = 'viewText';
    }

  }

})();
