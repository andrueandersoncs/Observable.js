'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observable = function Observable() {
  var _this = this;

  _classCallCheck(this, Observable);

  this.validateTypeHandler = function (type, handler) {
    if (typeof type !== 'string') {
      throw new Error('Type must be a string');
    }

    if (typeof handler !== 'function') {
      throw new Error('Handler must be a function');
    }
  };

  this.validateTypeMessage = function (type, message) {
    if (typeof type !== 'string') {
      throw new Error('Type must be a string');
    }

    if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) !== 'object') {
      throw new Error('Message must be an object');
    }
  };

  this.on = function (type, handler) {
    _this.validateTypeHandler(type, handler);

    if (!_this.types.has(type)) {
      _this.types.set(type, new Set());
    }

    _this.types.get(type).add(handler);
  };

  this.off = function (type, handler) {
    _this.validateTypeHandler(type, handler);

    if (!_this.types.has(type)) {
      return;
    }

    _this.types.get(type).delete(handler);
  };

  this.emit = function (type, message) {
    _this.validateTypeMessage(type, message);

    if (!_this.types.has(type)) {
      return;
    }

    var handlers = _this.types.get(type);
    handlers.forEach(function (handler) {
      return handler(message);
    });
  };

  this.types = new Map();
};

exports.default = Observable;