webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _todoApp = __webpack_require__(157);

	var _todoApp2 = _interopRequireDefault(_todoApp);

	var _alt = __webpack_require__(160);

	var _alt2 = _interopRequireDefault(_alt);

	var _iso = __webpack_require__(181);

	var _iso2 = _interopRequireDefault(_iso);

	var iso = new _iso2['default']();

	_alt2['default'].bootstrap(JSON.stringify({
	    TodoStore: {
	        todos: window.todos,
	        isCheckedAll: false
	    }
	}));
	//
	var markup = _react2['default'].renderToString(_react2['default'].createElement(_todoApp2['default'], null));
	var state = _alt2['default'].flush();
	iso.add(markup, state);

	exports['default'] = iso.render();
	module.exports = exports['default'];

/***/ }
]);