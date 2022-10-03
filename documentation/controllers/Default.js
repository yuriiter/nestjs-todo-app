'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.authController_postLogin = function authController_postLogin (req, res, next, body) {
  Default.authController_postLogin(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authController_postSignup = function authController_postSignup (req, res, next, body) {
  Default.authController_postSignup(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.todoListController_addNewTodoListItem = function todoListController_addNewTodoListItem (req, res, next, body, todoListId) {
  Default.todoListController_addNewTodoListItem(body, todoListId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.todoListController_create = function todoListController_create (req, res, next, body) {
  Default.todoListController_create(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.todoListController_delete = function todoListController_delete (req, res, next, id) {
  Default.todoListController_delete(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.todoListController_getAll = function todoListController_getAll (req, res, next, userId) {
  Default.todoListController_getAll(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.todoListController_getById = function todoListController_getById (req, res, next, id) {
  Default.todoListController_getById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.todoListItemController_changeStatus = function todoListItemController_changeStatus (req, res, next, id) {
  Default.todoListItemController_changeStatus(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userController_getAll = function userController_getAll (req, res, next) {
  Default.userController_getAll()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userController_getMe = function userController_getMe (req, res, next) {
  Default.userController_getMe()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
