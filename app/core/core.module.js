'use strict';

// создание модуля `core`, который зависит от модуля `core.task`
// Этот модуль служит для регистрации общих фильтров и сервисов (которые не являеютя специфичными для
// какого-либо представления или
// компонента). Этот модуль содержит функции для «всего приложения».
// Нам нужно добавить модуль `core.task` в качестве зависимости от модуля `core`.
angular.module('core', ['core.task']);
