(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Logger"] = factory();
	else
		root["Logger"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1)

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(2)

function Logger (config) {
	config = config || {}
	// 控制log等级
	this.LEVELS = [
		'log',
		'warn',
		'error',
	]
	// debug模式 title的字体大小
	this.debugTitleSize = config.debugTitleSize || 14
	// 是否使用颜色
	this.colored = config.colored === false ? false : true
	// log的时间格式
	this.dateTemp = config.dateTemp === undefined
		? 'HH:mm:SS'
		: config.dateTemp
	// 控制哪些log是可以显示出来，区别本地和线上
	this.logLevel = config.logLevel
		? this.getLevelFromName(config.logLevel)
		: 0
}

// 信息log
Logger.prototype.log = function (msg) {
	if(this.logLevel > 0) return
	console.log.apply(null, this.renderTemp('log', msg))
}

// 警告
Logger.prototype.warn = function (msg) {
	if(this.logLevel > 1) return
	console.log.apply(null, this.renderTemp('warn', msg))
}

// 错误log
Logger.prototype.error = function (msg) {
	if(this.logLevel > 3) return
	console.log.apply(null, this.renderTemp('error', msg))
}

// debug
Logger.prototype.debug = function (title, msg) {
	if(this.logLevel > 1) return
	console.log.apply(null, this.renderTemp('debug', msg, title))
}

// 设置全局log的等级
Logger.prototype.setLevel = function (levelName) {
	this.logLevel = this.getLevelFromName(levelName)
}

Logger.prototype.getLevelFromName = function (levelName) {
	var newLevel = this.LEVELS.indexOf(levelName)

	if(newLevel === -1) {
		this.error('level error')
		return
	}

	return newLevel
}

Logger.prototype.renderTemp = function (type, msg, title) {
	var date = utils.moment.getCurrent(this.dateTemp)

	if(type === 'debug') {
		var debugColors = [
			'#E6DA50',
			'#43CE87',
			'#5CC9F5',
			'#6638F0',
			'#F78AE0',
		]
		var dashs = '—'.repeat(20)
		var debugTitle = `%c${dashs}${title}[${date}]${dashs}\n%c%o%c%s`
		var debugColor = debugColors[(Math.random() * 5).toFixed(0)]

		return [
			debugTitle,
			`font-size: ${this.debugTitleSize}px;color:${debugColor}`,
			'',
			msg,
			`font-size: ${this.debugTitleSize}px;color: ${debugColor}`,
			`\n${'—'.repeat(debugTitle.length - 9)}`,
		]
	}else {
		var colors = {
			log: '#0AC380',
			warn: '#FFB000',
			error: '#F25353',
		}
		var temp = [
			`%c ${type.toUpperCase()} %c%s`,
			`color: #FFFFFF; background: ${colors[type]}`,
			'text-decoration: underline',
			this.dateTemp ? `[${date}]` : '',
			msg,
		]

		if(!this.colored) {
			temp.splice(1, 2)
			temp[0] = ' ' + type.toUpperCase()
		}

		return temp
	}
}

module.exports = Logger


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var moment = {
	getCurrent: function (template = 'YYYY-MM-DD') {
		const date = new Date()
		return this.formatter(date, template)
	},
	formatter: function (date, template = 'YYYY-MM-DD') {
		const newDate = new Date(date)
		const fullYear = newDate.getFullYear()
		const year = String(fullYear).substr(2)
		const month = newDate.getMonth() + 1
		const day = newDate.getDate()
		const hour = newDate.getHours()
		const minute = newDate.getMinutes()
		const second = newDate.getSeconds()

		const items = [
			{ key: 'YYYY', value: fullYear },				// 2017年
			{ key: 'YY', value: year },						// 17年
			{ key: 'MM', value: ('0' + month).substr(-2) },	// 02月
			{ key: 'M', value: month },						// 2月
			{ key: 'DD', value: ('0' + day).substr(-2) },	// 02号
			{ key: 'dd', value: day },						// 2号
			{ key: 'HH', value: ('0' + hour).substr(-2) },	// 24小时制
			{ key: 'H', value: hour },						// 2点
			{ key: 'mm', value: ('0' + minute).substr(-2) },// 02分
			{ key: 'm', value: minute },					// 2分
			{ key: 'SS', value: ('0' + second).substr(-2) },// 02秒
			{ key: 'S', value: second },					// 2秒
		]

		items.forEach(item => {
			template = template.replace(item.key, item.value)
		})

		return template
	}
}

module.exports = {
	moment: moment,
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=logger.map