(function () {
  'use strict';

// создание модуля `todoListApp`, который зависит от модуля `todoList`

// Передав `todoList` внутри массива зависимостей при определении модуля `todoListApp`, Angular сделает все сущности,
// зарегистрированные в `todoList`, доступными и в `todoListApp`.

// Каждый функциональный блок объявляет свой собственный модуль и регистрирует все связанные объекты.
// Основной модуль (`todoListApp`) объявляет зависимость от каждого модуля функционального блока.
// Теперь все, что требуется для повторного использования того же кода в новом проекте -
// это копирование каталога компонентов и добавление модуля компонентов в качестве зависимости в основной модуль нового проекта.
// Чтобы сделать провайдеров, сервисы и директивы, определенные в ngRoute, доступными для приложения, нужно добавить
// ngRoute в качестве зависимости модуля `todoListApp`.
  angular.module('todoListApp', [
    `ngAnimate`,
    'ngRoute',
    'core',
    'taskDetail',
    'todoList'
  ]);

})();
